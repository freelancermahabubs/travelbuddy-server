/*
  Warnings:

  - You are about to drop the `TravelRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Trip` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TravelRequest" DROP CONSTRAINT "TravelRequest_tripId_fkey";

-- DropForeignKey
ALTER TABLE "TravelRequest" DROP CONSTRAINT "TravelRequest_userId_fkey";

-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_userId_fkey";

-- DropTable
DROP TABLE "TravelRequest";

-- DropTable
DROP TABLE "Trip";

-- CreateTable
CREATE TABLE "trips" (
    "id" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "photos" TEXT[],
    "travelType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "travelDates" TIMESTAMP(3)[],
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trips_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "travelRequests" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "photos" TEXT[],
    "tripId" TEXT NOT NULL,
    "additionalInfo" TEXT,
    "status" "TravelStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "travelRequests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travelRequests" ADD CONSTRAINT "travelRequests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travelRequests" ADD CONSTRAINT "travelRequests_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "trips"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
