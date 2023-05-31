import prisma from "@/app/api/database/config/prismaClient";
import {
  createBook,
  getAllBooks,
  updateBook,
  deleteBook,
} from "@/app/api/books/services/service";
import { findBookByDetails, validateAuthors, createNewBook, connectAuthorsToBook, findBookById } from "@/app/api/books/utils/utils";

jest.mock("@/app/api/database/config/prismaClient", () => ({
  livros: {
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

jest.mock("@/app/api/books/utils/utils", () => ({
  findBookByDetails: jest.fn(),
  validateAuthors: jest.fn(),
  createNewBook: jest.fn(),
  connectAuthorsToBook: jest.fn(),
  findBookById: jest.fn(),
}));

describe("createBook", () => {
  test("should create a new book when valid data is provided", async () => {
    const bookData = {
      nome: "Book 1",
      data_lancamento: "2023-05-30",
      descricao: "Description",
      categoria: "Category",
      autores: [1, 2, 3],
    };

    (findBookByDetails as jest.Mock).mockResolvedValueOnce(null);
    (validateAuthors as jest.Mock).mockResolvedValueOnce([1, 2, 3]);
    (createNewBook as jest.Mock).mockResolvedValueOnce({ id: 1 });
    (connectAuthorsToBook as jest.Mock).mockResolvedValueOnce(1);
    (findBookById as jest.Mock).mockResolvedValueOnce({ id: 1, ...bookData });

    const result = await createBook(bookData);
    expect(result.status).toEqual("success");
    expect(result.book).toEqual({ id: 1, ...bookData });
  });
});

describe("getAllBooks", () => {
  test("should return all books with authors", async () => {
    const books = [
      {
        id: 1,
        nome: "Book 1",
        data_lancamento: "2023-05-30",
        descricao: "Description",
        categoria: "Category",
        autoresLivros: [{ autor: { nome: "Author 1" } }],
      },
      {
        id: 2,
        nome: "Book 2",
        data_lancamento: "2023-05-31",
        descricao: "Description",
        categoria: "Category",
        autoresLivros: [{ autor: { nome: "Author 2" } }],
      },
    ];

    (prisma.livros.findMany as jest.Mock).mockResolvedValueOnce(books);

    const result = await getAllBooks();

    expect(result).toEqual([
      {
        id: 1,
        nome: "Book 1",
        data_lancamento: "2023-05-30",
        descricao: "Description",
        categoria: "Category",
        autores: ["Author 1"],
      },
      {
        id: 2,
        nome: "Book 2",
        data_lancamento: "2023-05-31",
        descricao: "Description",
        categoria: "Category",
        autores: ["Author 2"],
      },
    ]);
  });
});

describe("updateBook", () => {
  test("should update an existing book with valid data", async () => {
    const bookId = 1;
    const bookData = {
      nome: "Updated Book",
      data_lancamento: "2023-06-01",
      descricao: "Updated Description",
      categoria: "Updated Category",
      autores: [4, 5],
    };

    (validateAuthors as jest.Mock).mockResolvedValueOnce([4, 5]);
    (findBookById as jest.Mock).mockResolvedValueOnce({ id: bookId, ...bookData });

    const result = await updateBook(bookId, bookData);
    expect(result.status).toEqual("success");
    expect(result.book).toEqual({ id: bookId, ...bookData });
  });
});

describe("deleteBook", () => {
  test("should delete an existing book", async () => {
    const bookId = 1;

    (findBookById as jest.Mock).mockResolvedValueOnce({ id: bookId });

    const result = await deleteBook(bookId);

    expect(result.status).toEqual("success");
    expect(result.message).toEqual("Livro deletado com sucesso");
  });
});
