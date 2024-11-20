/*
  Warnings:

  - You are about to drop the column `collectorId` on the `Donor` table. All the data in the column will be lost.
  - You are about to drop the column `systemAdminId` on the `Donor` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Donor" DROP CONSTRAINT "Donor_collectorId_fkey";

-- DropForeignKey
ALTER TABLE "Donor" DROP CONSTRAINT "Donor_systemAdminId_fkey";

-- AlterTable
ALTER TABLE "Donor" DROP COLUMN "collectorId",
DROP COLUMN "systemAdminId";
