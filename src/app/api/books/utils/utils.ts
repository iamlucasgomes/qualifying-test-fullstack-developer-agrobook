import prisma from "../../database/config/prismaClient";

export async function findBookByDetails(nome: string, data_lancamento: string, categoria: string) {
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

export async function validateAuthors(authors: number[]) {
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

export async function createNewBook(nome: string, data_lancamento: string, descricao: string | undefined, categoria: string) {
  return await prisma.livros.create({
    data: {
      nome,
      data_lancamento: new Date(data_lancamento),
      descricao,
      categoria
    },
  });
}

export async function connectAuthorsToBook(bookId: number, authors: number[]) {
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

export async function findBookById(bookId: number) {
  return await prisma.livros.findUnique({
    where: { id: bookId },
    include: { autoresLivros: true },
  });
}