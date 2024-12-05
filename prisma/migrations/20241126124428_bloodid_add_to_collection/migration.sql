/*
  Warnings:

  - You are about to drop the `_BloodToCollection` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bloodId` to the `Collection` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_BloodToCollection" DROP CONSTRAINT "_BloodToCollection_A_fkey";

-- DropForeignKey
ALTER TABLE "_BloodToCollection" DROP CONSTRAINT "_BloodToCollection_B_fkey";

-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "bloodId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_BloodToCollection";

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_bloodId_fkey" FOREIGN KEY ("bloodId") REFERENCES "Blood"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
