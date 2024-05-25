/*
  Warnings:

  - You are about to drop the column `photo` on the `Trip` table. All the data in the column will be lost.
  - The `travelDates` column on the `Trip` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `travelType` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TravelRequest" ADD COLUMN     "photos" TEXT[];

-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "photo",
ADD COLUMN     "photos" TEXT[],
ADD COLUMN     "travelType" TEXT NOT NULL,
DROP COLUMN "travelDates",
ADD COLUMN     "travelDates" TIMESTAMP(3)[];
