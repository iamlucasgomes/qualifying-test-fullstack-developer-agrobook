import IAuthorData from "../interfaces/AuthorData.interace";
import prisma from "../../database/config/prismaClient";

export async function getAllAuthors() {
  const authors = await prisma.autores.findMany();
  return authors;
}

export async function createAuthor(authorData: IAuthorData) {
  const existingAuthor = await prisma.autores.findFirst({
    where: {
      nome: authorData.nome, data_nascimento: {
        equals: new Date(authorData.data_nascimento)
      }
    },
  });
  if (!existingAuthor) {
    const newAuthor = await prisma.autores.create({
      data: {
        nome: authorData.nome,
        data_nascimento: new Date(authorData.data_nascimento),
        biografia: authorData.biografia
      },
    });
    return { status: 'success', author: newAuthor };
  }
  return { status: 'error', message: 'Autor já existe no banco de dados' };
}
