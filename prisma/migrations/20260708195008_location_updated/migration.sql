/*
  Warnings:

  - You are about to drop the column `address` on the `technicianProfile` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `users` table. All the data in the column will be lost.
  - Added the required column `location` to the `technicianProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "technicianProfile" DROP COLUMN "address",
ADD COLUMN     "location" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "address",
ADD COLUMN     "location" VARCHAR(255) NOT NULL;
