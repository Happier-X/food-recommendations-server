/*
  Warnings:

  - You are about to drop the `rating` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `rating` to the `Food` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `food` ADD COLUMN `rating` DOUBLE NOT NULL;

-- DropTable
DROP TABLE `rating`;
