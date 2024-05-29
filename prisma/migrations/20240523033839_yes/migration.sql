/*
  Warnings:

  - Changed the type of `travelType` on the `trips` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TravelType" AS ENUM ('ADVENTURE', 'LEISURE', 'BUSINESS');

-- AlterTable
ALTER TABLE "trips" DROP COLUMN "travelType",
ADD COLUMN     "travelType" "TravelType" NOT NULL;
