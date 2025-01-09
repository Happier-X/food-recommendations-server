-- DropForeignKey
ALTER TABLE `food` DROP FOREIGN KEY `Food_userId_fkey`;

-- DropIndex
DROP INDEX `Food_userId_fkey` ON `food`;
