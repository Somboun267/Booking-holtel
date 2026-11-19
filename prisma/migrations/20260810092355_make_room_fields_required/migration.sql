/*
  Warnings:

  - Made the column `floor` on table `rooms` required. This step will fail if there are existing NULL values in that column.
  - Made the column `room_type_id` on table `rooms` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `rooms` DROP FOREIGN KEY `rooms_room_type_id_fkey`;

-- DropIndex
DROP INDEX `rooms_room_type_id_fkey` ON `rooms`;

-- AlterTable
ALTER TABLE `rooms` MODIFY `floor` INTEGER NOT NULL,
    MODIFY `room_type_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `rooms` ADD CONSTRAINT `rooms_room_type_id_fkey` FOREIGN KEY (`room_type_id`) REFERENCES `room_types`(`room_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
