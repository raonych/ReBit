/*
  Warnings:

  - You are about to drop the column `compraId` on the `produto` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[produtoId]` on the table `Compra` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `produtoId` to the `Compra` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `produto` DROP FOREIGN KEY `Produto_compraId_fkey`;

-- DropIndex
DROP INDEX `Produto_compraId_key` ON `produto`;

-- AlterTable
ALTER TABLE `compra` ADD COLUMN `produtoId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `produto` DROP COLUMN `compraId`;

-- CreateIndex
CREATE UNIQUE INDEX `Compra_produtoId_key` ON `Compra`(`produtoId`);

-- AddForeignKey
ALTER TABLE `Compra` ADD CONSTRAINT `Compra_produtoId_fkey` FOREIGN KEY (`produtoId`) REFERENCES `Produto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
