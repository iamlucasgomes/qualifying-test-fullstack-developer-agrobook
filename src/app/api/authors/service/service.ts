const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export async function getAllAuthors() {
  const authors = await prisma.Autores.findMany();
  return authors;
}

getAllAuthors()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })