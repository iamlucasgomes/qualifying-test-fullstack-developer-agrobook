import { getAllAuthors, createAuthor } from "@/app/api/authors/services/service";
import prisma from "@/app/api/database/config/prismaClient";
import IAuthorData from "@/app/api/authors/interfaces/AuthorData.interace";

jest.mock("@/app/api/database/config/prismaClient", () => ({
  autores: {
    findMany: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
  },
}));

describe("getAllAuthors", () => {
  it("should return all authors", async () => {
    const mockAuthors: IAuthorData[] = [
      { nome: "Autor 1", data_nascimento: "2000-01-01", biografia: "Biografia do Autor 1" },
      { nome: "Autor 2", data_nascimento: "2000-01-02", biografia: "Biografia do Autor 2" },
    ];;
    (prisma.autores.findMany as jest.Mock).mockResolvedValue(mockAuthors);

    const authors = await getAllAuthors();

    expect(authors).toEqual(mockAuthors);
    expect(prisma.autores.findMany).toHaveBeenCalled();
  });
});

describe("createAuthor", () => {
  it("must create a new author", async () => {
    const authorData: IAuthorData = {
      nome: "Novo Autor",
      data_nascimento: "2000-01-01",
      biografia: "Biografia do novo autor",
    };

    (prisma.autores.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.autores.create as jest.Mock).mockResolvedValue({
      id: 1,
      nome: authorData.nome,
      data_nascimento: new Date(authorData.data_nascimento),
      biografia: authorData.biografia,
    });

    const result = await createAuthor(authorData);

    expect(result.status).toBe("success");
    expect(result.author).toEqual({
      id: 1,
      nome: authorData.nome,
      data_nascimento: new Date(authorData.data_nascimento),
      biografia: authorData.biografia,
    });
    expect(prisma.autores.findFirst).toHaveBeenCalledWith({
      where: {
        nome: authorData.nome,
        data_nascimento: {
          equals: new Date(authorData.data_nascimento),
        },
      },
    });
    expect(prisma.autores.create).toHaveBeenCalledWith({
      data: {
        nome: authorData.nome,
        data_nascimento: new Date(authorData.data_nascimento),
        biografia: authorData.biografia,
      },
    });
  });

  it("should return an error if the author already exists", async () => {
    const authorData: IAuthorData = {
      nome: "Autor Existente",
      data_nascimento: "2000-01-01",
      biografia: "Biografia do autor existente",
    };

    (prisma.autores.findFirst as jest.Mock).mockResolvedValue({ id: 1, nome: authorData.nome });

    const result = await createAuthor(authorData);

    expect(result.status).toBe("error");
    expect(result.message).toBe("Autor já existe no banco de dados");
    expect(prisma.autores.findFirst).toHaveBeenCalledWith({
      where: {
        nome: authorData.nome,
        data_nascimento: {
          equals: new Date(authorData.data_nascimento),
        },
      },
    });
    expect(prisma.autores.create).not.toHaveBeenCalled();
  });
});