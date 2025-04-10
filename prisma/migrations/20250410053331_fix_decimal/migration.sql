/*
  Warnings:

  - You are about to alter the column `preco` on the `produto` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE `produto` MODIFY `preco` DECIMAL(10, 2) NOT NULL;
