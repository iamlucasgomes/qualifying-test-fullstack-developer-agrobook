// import prisma from "../../database/config/prismaClient";
// import BookData from "../interfaces/BookData.interface";

// export async function createBook(bookData: BookData) {
//   const { nome, data_lancamento, categoria, autores } = bookData;

//   const existingBook = await prisma.livros.findFirst({
//     where: {
//       nome,
//       data_lancamento: {
//         equals: new Date(data_lancamento),
//       },
//       categoria,
//     },
//   });

//   if (existingBook) {
//     return { status: 'error', message: 'Livro já existe no banco de dados' };
//   }

//   let newBook;
//   try {
//     await prisma.$transaction(async (prisma) => {
//       const createdBook = await prisma.livros.create({
//         data: {
//           nome,
//           data_lancamento: new Date(data_lancamento),
//           categoria,
//         },
//       });

//       const bookId = createdBook.id;

//       const authorPromises = autores.map((autorId:number) =>
//         prisma.autoresLivros.create({
//           data: {
//             autor: { connect: { id: autorId } },
//             livro: { connect: { id: bookId } },
//           },
//         })
//       );

//       await Promise.all(authorPromises);

//       newBook = await prisma.livros.findUnique({
//         where: { id: bookId },
//         include: { autoresLivros: true },
//       });
//     });
//   } catch (error: unknown) {
//     return { status: 'error', message: error };
//   }

//   return { status: 'success', book: newBook };
// }

import prisma from "../../database/config/prismaClient";
import BookData from "../interfaces/BookData.interface";

export async function createBook(bookData: BookData) {
  const { nome, data_lancamento, descricao, categoria, autores } = bookData;

  const existingBook = await findBookByDetails(nome, data_lancamento, categoria);

  if (existingBook) {
    return { status: 'error', message: 'Livro já existe no banco de dados' };
  }

  try {
    const createdBook = await createNewBook(nome, data_lancamento, descricao, categoria);
    const bookId = createdBook.id;
    await connectAuthorsToBook(bookId, autores);
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

async function createNewBook(nome: string, data_lancamento: string, descricao: string | undefined, categoria: string) {
  return await prisma.livros.create({
    data: {
      nome,
      data_lancamento: new Date(data_lancamento),
      descricao,
      categoria,
    },
  });
}

async function connectAuthorsToBook(bookId: number, autores: number[]) {
  const authorPromises = autores.map((autorId: number) =>
    prisma.autoresLivros.create({
      data: {
        autor: { connect: { id: autorId } },
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
