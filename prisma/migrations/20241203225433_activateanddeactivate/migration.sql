/*
  Warnings:

  - You are about to drop the column `deactivatedAt` on the `Donor` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Donor` table. All the data in the column will be lost.
  - You are about to drop the column `deactivatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Donor" DROP COLUMN "deactivatedAt",
DROP COLUMN "isActive";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "deactivatedAt",
DROP COLUMN "isActive";
