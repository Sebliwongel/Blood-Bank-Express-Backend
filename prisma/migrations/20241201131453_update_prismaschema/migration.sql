/*
  Warnings:

  - You are about to drop the column `addressId` on the `Donor` table. All the data in the column will be lost.
  - You are about to drop the column `contactInfoId` on the `Donor` table. All the data in the column will be lost.
  - You are about to drop the column `addressId` on the `Hospital` table. All the data in the column will be lost.
  - You are about to drop the column `contactInfoId` on the `Hospital` table. All the data in the column will be lost.
  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ContactInfo` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Donor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `Donor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `Hospital` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Donor" DROP CONSTRAINT "Donor_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Donor" DROP CONSTRAINT "Donor_contactInfoId_fkey";

-- DropForeignKey
ALTER TABLE "Hospital" DROP CONSTRAINT "Hospital_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Hospital" DROP CONSTRAINT "Hospital_contactInfoId_fkey";

-- DropIndex
DROP INDEX "Donor_addressId_key";

-- DropIndex
DROP INDEX "Donor_contactInfoId_key";

-- DropIndex
DROP INDEX "Hospital_addressId_key";

-- DropIndex
DROP INDEX "Hospital_contactInfoId_key";

-- AlterTable
ALTER TABLE "Donor" DROP COLUMN "addressId",
DROP COLUMN "contactInfoId",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "cellPhone" TEXT,
ADD COLUMN     "telephone" TEXT;

-- AlterTable
ALTER TABLE "Hospital" DROP COLUMN "addressId",
DROP COLUMN "contactInfoId",
ADD COLUMN     "address" TEXT NOT NULL;

-- DropTable
DROP TABLE "Address";

-- DropTable
DROP TABLE "ContactInfo";

-- CreateIndex
CREATE UNIQUE INDEX "Donor_email_key" ON "Donor"("email");
