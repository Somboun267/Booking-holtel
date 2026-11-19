/*
  Warnings:

  - A unique constraint covering the columns `[amenity_name]` on the table `amenities` will be added. If there are existing duplicate values, this will fail.
  - Made the column `amenity_name` on table `amenities` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `amenities` MODIFY `amenity_name` VARCHAR(50) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `amenities_amenity_name_key` ON `amenities`(`amenity_name`);
