/*
  Warnings:

  - Changed the type of `name` on the `category` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ServiceCategory" AS ENUM ('PLUMBING', 'ELECTRICAL', 'CLEANING', 'PAINTING', 'CARPENTRY', 'AC_REPAIR', 'APPLIANCE_REPAIR', 'HOME_CLEANING', 'PEST_CONTROL', 'LOCKSMITH');

-- AlterTable
ALTER TABLE "category" DROP COLUMN "name",
ADD COLUMN     "name" "ServiceCategory" NOT NULL;
