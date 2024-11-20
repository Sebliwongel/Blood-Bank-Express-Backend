/*
  Warnings:

  - Added the required column `bloodtype` to the `Donor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Donor" ADD COLUMN     "bloodtype" TEXT NOT NULL;
