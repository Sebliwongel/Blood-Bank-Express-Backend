/*
  Warnings:

  - You are about to drop the column `StockLevel` on the `BloodInventory` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `BloodInventory` table. All the data in the column will be lost.
  - Added the required column `quantityml` to the `BloodInventory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BloodInventory" DROP COLUMN "StockLevel",
DROP COLUMN "quantity",
ADD COLUMN     "quantityml" INTEGER NOT NULL,
ADD COLUMN     "stockLevel" INTEGER;
