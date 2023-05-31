-- CreateTable
CREATE TABLE "Autores" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "biografia" TEXT,

    CONSTRAINT "Autores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Livros" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "data_lancamento" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT,
    "categoria" TEXT,

    CONSTRAINT "Livros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AutoresLivros" (
    "id" SERIAL NOT NULL,
    "autorId" INTEGER NOT NULL,
    "livroId" INTEGER NOT NULL,

    CONSTRAINT "AutoresLivros_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AutoresLivros_livroId_autorId_idx" ON "AutoresLivros"("livroId", "autorId");

-- CreateIndex
CREATE UNIQUE INDEX "AutoresLivros_autorId_livroId_key" ON "AutoresLivros"("autorId", "livroId");

-- AddForeignKey
ALTER TABLE "AutoresLivros" ADD CONSTRAINT "AutoresLivros_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "Autores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AutoresLivros" ADD CONSTRAINT "AutoresLivros_livroId_fkey" FOREIGN KEY ("livroId") REFERENCES "Livros"("id") ON DELETE CASCADE ON UPDATE CASCADE;

