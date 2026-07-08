/*
  Warnings:

  - You are about to drop the `service` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "service" DROP CONSTRAINT "service_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "service" DROP CONSTRAINT "service_technicianProfileId_fkey";

-- DropTable
DROP TABLE "service";

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "technicianProfileId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "duration" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_technicianProfileId_fkey" FOREIGN KEY ("technicianProfileId") REFERENCES "technicianProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
