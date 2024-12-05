/*
  Warnings:

  - You are about to drop the column `bloodId` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `collectorId` on the `Donor` table. All the data in the column will be lost.
  - You are about to drop the `Donation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `donorId` to the `Blood` table without a default value. This is not possible if the table is not empty.
  - Added the required column `COLLECTORId` to the `Collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_bloodId_fkey";

-- DropForeignKey
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_bloodId_fkey";

-- DropForeignKey
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_donorId_fkey";

-- DropForeignKey
ALTER TABLE "Donor" DROP CONSTRAINT "Donor_collectorId_fkey";

-- AlterTable
ALTER TABLE "Blood" ADD COLUMN     "donorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "bloodId",
ADD COLUMN     "COLLECTORId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Donor" DROP COLUMN "collectorId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "username" TEXT NOT NULL;

-- DropTable
DROP TABLE "Donation";

-- CreateTable
CREATE TABLE "_BloodToCollection" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BloodToCollection_AB_unique" ON "_BloodToCollection"("A", "B");

-- CreateIndex
CREATE INDEX "_BloodToCollection_B_index" ON "_BloodToCollection"("B");

-- AddForeignKey
ALTER TABLE "Blood" ADD CONSTRAINT "Blood_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "Donor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_COLLECTORId_fkey" FOREIGN KEY ("COLLECTORId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BloodToCollection" ADD CONSTRAINT "_BloodToCollection_A_fkey" FOREIGN KEY ("A") REFERENCES "Blood"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BloodToCollection" ADD CONSTRAINT "_BloodToCollection_B_fkey" FOREIGN KEY ("B") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
