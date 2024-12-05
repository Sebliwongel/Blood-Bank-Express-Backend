/*
  Warnings:

  - Added the required column `barcode` to the `BloodInventory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BloodInventory" ADD COLUMN     "barcode" TEXT NOT NULL;
