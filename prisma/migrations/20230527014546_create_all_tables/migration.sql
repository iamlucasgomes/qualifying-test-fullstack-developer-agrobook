-- CreateTable
CREATE TABLE `Autores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `data_nascimento` DATETIME(3) NOT NULL,
    `biografia` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Livros` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `data_lancamento` DATETIME(3) NOT NULL,
    `descricao` VARCHAR(191) NULL,
    `categoria` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AutoresLivros` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `autorId` INTEGER NOT NULL,
    `livroId` INTEGER NOT NULL,

    INDEX `AutoresLivros_livroId_autorId_idx`(`livroId`, `autorId`),
    UNIQUE INDEX `AutoresLivros_autorId_livroId_key`(`autorId`, `livroId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AutoresLivros` ADD CONSTRAINT `AutoresLivros_autorId_fkey` FOREIGN KEY (`autorId`) REFERENCES `Autores`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AutoresLivros` ADD CONSTRAINT `AutoresLivros_livroId_fkey` FOREIGN KEY (`livroId`) REFERENCES `Livros`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
