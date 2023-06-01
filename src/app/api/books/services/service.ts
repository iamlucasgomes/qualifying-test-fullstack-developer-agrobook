import prisma from "../../database/config/prismaClient";
import BookData from "../interfaces/BookData.interface";
import IUpdateData from "../interfaces/updateData.interface";
import { findBookByDetails, validateAuthors, createNewBook, connectAuthorsToBook, findBookById } from "../utils/utils";

export async function createBook(bookData: BookData) {
  const { nome, data_lancamento, descricao, categoria, autores } = bookData;

  const existingBook = await findBookByDetails(nome, data_lancamento, categoria);

  if (existingBook) {
    return { status: 'error409', message: 'Livro já existe no banco de dados' };
  }

  const validAuthors = await validateAuthors(autores);

  if (validAuthors.length !== autores.length) {
    return { status: 'error404', message: 'Um ou mais autores não existem no banco de dados' };
  }

  try {
    const createdBook = await createNewBook(nome, data_lancamento, descricao, categoria);
    const bookId = createdBook.id;
    await connectAuthorsToBook(bookId, validAuthors);
    const newBook = await findBookById(bookId);
    return { status: 'success', book: newBook };
  } catch (error: unknown) {
    return { status: 'error', message: error };
  }
}

export async function getAllBooks() {
  const books = await prisma.livros.findMany({
    include: {
      autoresLivros: {
        select: {
          autor: {
            select: {
              nome: true
            }
          }
        },
      }
    },
  });
  const booksWithAuthors = books.map(book => ({
    ...book,
    autores: book.autoresLivros.map(relation => relation.autor.nome)
  }));

  return booksWithAuthors.map(({ autoresLivros, ...book }) => book);
}

export async function updateBook(bookId: number, bookData: BookData) {
  const { nome, data_lancamento, descricao, categoria, autores } = bookData;

  const existingBook = await findBookById(bookId);

  if (!existingBook) {
    return { status: 'error404', message: 'Livro não existe no banco de dados' };
  }

  try {
    const updateData: IUpdateData = {};

    if (nome) updateData.nome = nome;
    if (data_lancamento) updateData.data_lancamento = new Date(data_lancamento);
    if (descricao) updateData.descricao = descricao;
    if (categoria) updateData.categoria = categoria;
    if (autores) updateData.autores = autores;

    if (autores) {
      const validAuthors = await validateAuthors(autores);
      if (validAuthors.length !== autores.length) {
        return { status: 'error404', message: 'Um ou mais autores não existem no banco de dados' };
      }
      await connectAuthorsToBook(bookId, validAuthors);
    }

    await prisma.livros.update({
      where: { id: bookId },
      data: updateData,
    });

    const updatedBook = await findBookById(bookId);
    return { status: 'success', book: updatedBook };
  } catch (error: unknown) {
    return { status: 'error', message: error };
  }
}

export async function deleteBook(bookId: number) {
  const existingBook = await findBookById(bookId);

  if (!existingBook) {
    return { status: 'error404', message: 'Livro não existe no banco de dados' };
  }

  try {
    await prisma.livros.delete({
      where: { id: bookId },
    });
    return { status: 'success', message: 'Livro deletado com sucesso' };
  } catch (error: unknown) {
    return { status: 'error', message: error };
  }
}
