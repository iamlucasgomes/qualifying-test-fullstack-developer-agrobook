import prisma from "../../database/config/prismaClient";
import BookData from "../interfaces/BookData.interface";

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

async function findBookByDetails(nome: string, data_lancamento: string, categoria: string) {
  return await prisma.livros.findFirst({
    where: {
      nome,
      data_lancamento: {
        equals: new Date(data_lancamento),
      },
      categoria,
    },
  });
}

async function validateAuthors(authors: number[]) {
  const validAuthors = await prisma.autores.findMany({
    where: {
      id: {
        in: authors,
      },
    },
    select: {
      id: true,
    },
  });

  return validAuthors.map((author) => author.id);
}

async function createNewBook(nome: string, data_lancamento: string, descricao: string | undefined, categoria: string) {
  return await prisma.livros.create({
    data: {
      nome,
      data_lancamento: new Date(data_lancamento),
      categoria,
    },
  });
}

async function connectAuthorsToBook(bookId: number, authors: number[]) {
  const authorPromises = authors.map((authorId: number) =>
    prisma.autoresLivros.create({
      data: {
        autor: { connect: { id: authorId } },
        livro: { connect: { id: bookId } },
      },
    })
  );
  await Promise.all(authorPromises);
}

async function findBookById(bookId: number) {
  return await prisma.livros.findUnique({
    where: { id: bookId },
    include: { autoresLivros: true },
  });
}
