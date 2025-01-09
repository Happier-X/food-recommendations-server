/*
  Warnings:

  - You are about to drop the column `address` on the `food` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `food` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `food` table. All the data in the column will be lost.
  - You are about to drop the column `reason` on the `food` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `food` table. All the data in the column will be lost.
  - Added the required column `foodType` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recommendation` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shopName` to the `Food` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `food` DROP COLUMN `address`,
    DROP COLUMN `category`,
    DROP COLUMN `image`,
    DROP COLUMN `reason`,
    DROP COLUMN `score`,
    ADD COLUMN `foodType` VARCHAR(191) NOT NULL,
    ADD COLUMN `imageUrl` VARCHAR(191) NOT NULL,
    ADD COLUMN `location` VARCHAR(191) NOT NULL,
    ADD COLUMN `rating` DOUBLE NOT NULL,
    ADD COLUMN `recommendation` VARCHAR(191) NOT NULL,
    ADD COLUMN `shopName` VARCHAR(191) NOT NULL;
