/*
  Warnings:

  - Added the required column `updatedAt` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_adminId_fkey";

-- DropIndex
DROP INDEX "Account_userId_key";

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "SystemAdmin" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SystemAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AccountToDonor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AccountToDonor_AB_unique" ON "_AccountToDonor"("A", "B");

-- CreateIndex
CREATE INDEX "_AccountToDonor_B_index" ON "_AccountToDonor"("B");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "SystemAdmin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "SystemAdmin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToDonor" ADD CONSTRAINT "_AccountToDonor_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToDonor" ADD CONSTRAINT "_AccountToDonor_B_fkey" FOREIGN KEY ("B") REFERENCES "Donor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
