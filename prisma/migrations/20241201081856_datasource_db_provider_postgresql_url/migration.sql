/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `poBox` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Address` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "createdAt",
DROP COLUMN "poBox",
DROP COLUMN "updatedAt",
ADD COLUMN     "postalCode" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "street" TEXT,
ALTER COLUMN "subCity" DROP NOT NULL,
ALTER COLUMN "zone" DROP NOT NULL,
ALTER COLUMN "woreda" DROP NOT NULL,
ALTER COLUMN "kebele" DROP NOT NULL;
