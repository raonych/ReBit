/*
  Warnings:

  - You are about to alter the column `preco` on the `produto` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - Added the required column `bairro` to the `Endereco` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `endereco` ADD COLUMN `bairro` VARCHAR(191) NOT NULL,
    ADD COLUMN `complemento` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `produto` MODIFY `preco` DECIMAL NOT NULL;
