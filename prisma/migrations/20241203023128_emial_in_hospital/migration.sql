/*
  Warnings:

  - A unique constraint covering the columns `[barcode]` on the table `BloodInventory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Hospital` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BloodInventory" ALTER COLUMN "storageStatus" SET DEFAULT 'AVAILABLE';

-- AlterTable
ALTER TABLE "Hospital" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BloodInventory_barcode_key" ON "BloodInventory"("barcode");
