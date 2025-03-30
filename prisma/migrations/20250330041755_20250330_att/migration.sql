/*
  Warnings:

  - The values [invoice,paypal] on the enum `Payment_paymentMethod` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `payment` MODIFY `paymentMethod` ENUM('credit_card', 'debit_card', 'pix') NOT NULL;

-- AlterTable
ALTER TABLE `product` MODIFY `price` DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE `review` MODIFY `reviewText` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `cellphone` VARCHAR(14) NULL;

-- CreateTable
CREATE TABLE `addresses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `UF` CHAR(2) NOT NULL,
    `zipCode` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `addresses` ADD CONSTRAINT `addresses_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
