/*
  Warnings:

  - You are about to drop the column `cellPhone` on the `Donor` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Donor` table. All the data in the column will be lost.
  - You are about to drop the column `kebele` on the `Donor` table. All the data in the column will be lost.
  - You are about to drop the column `poBox` on the `Donor` table. All the data in the column will be lost.
  - You are about to drop the column `subCity` on the `Donor` table. All the data in the column will be lost.
  - You are about to drop the column `telephone` on the `Donor` table. All the data in the column will be lost.
  - You are about to drop the column `woreda` on the `Donor` table. All the data in the column will be lost.
  - You are about to drop the column `zone` on the `Donor` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Hospital` table. All the data in the column will be lost.
  - You are about to drop the column `contactInfo` on the `Hospital` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Hospital` table. All the data in the column will be lost.
  - You are about to drop the column `adminId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Blood` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Collection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Inventory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SystemAdmin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AccountToDonor` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[addressId]` on the table `Donor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contactInfoId]` on the table `Donor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[addressId]` on the table `Hospital` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contactInfoId]` on the table `Hospital` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `addressId` to the `Donor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactInfoId` to the `Donor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Hospital` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Integration` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `bloodType` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "BloodType" AS ENUM ('A_POS', 'A_NEG', 'B_POS', 'B_NEG', 'AB_POS', 'AB_NEG', 'O_POS', 'O_NEG');

-- CreateEnum
CREATE TYPE "StorageStatus" AS ENUM ('AVAILABLE', 'RESERVED', 'USED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'COMPLETED', 'CANCELED');

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Blood" DROP CONSTRAINT "Blood_donorId_fkey";

-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_COLLECTORId_fkey";

-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_bloodId_fkey";

-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_bloodId_fkey";

-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_integrationId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_adminId_fkey";

-- DropForeignKey
ALTER TABLE "_AccountToDonor" DROP CONSTRAINT "_AccountToDonor_A_fkey";

-- DropForeignKey
ALTER TABLE "_AccountToDonor" DROP CONSTRAINT "_AccountToDonor_B_fkey";

-- DropIndex
DROP INDEX "Hospital_email_key";

-- AlterTable
ALTER TABLE "Donor" DROP COLUMN "cellPhone",
DROP COLUMN "city",
DROP COLUMN "kebele",
DROP COLUMN "poBox",
DROP COLUMN "subCity",
DROP COLUMN "telephone",
DROP COLUMN "woreda",
DROP COLUMN "zone",
ADD COLUMN     "addressId" INTEGER NOT NULL,
ADD COLUMN     "contactInfoId" INTEGER NOT NULL,
ADD COLUMN     "deactivatedAt" TIMESTAMP(3),
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Hospital" DROP COLUMN "address",
DROP COLUMN "contactInfo",
DROP COLUMN "email",
ADD COLUMN     "addressId" INTEGER,
ADD COLUMN     "contactInfoId" INTEGER,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deactivatedAt" TIMESTAMP(3),
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Integration" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "adminId",
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "bloodType",
ADD COLUMN     "bloodType" "BloodType" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "OrderStatus" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deactivatedAt" TIMESTAMP(3),
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "refreshToken" TEXT;

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Blood";

-- DropTable
DROP TABLE "Collection";

-- DropTable
DROP TABLE "Inventory";

-- DropTable
DROP TABLE "SystemAdmin";

-- DropTable
DROP TABLE "_AccountToDonor";

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,
    "subCity" TEXT NOT NULL,
    "zone" TEXT NOT NULL,
    "woreda" TEXT NOT NULL,
    "kebele" TEXT NOT NULL,
    "poBox" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactInfo" (
    "id" SERIAL NOT NULL,
    "telephone" TEXT,
    "cellPhone" TEXT,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BloodInventory" (
    "id" SERIAL NOT NULL,
    "bloodType" "BloodType" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "donationDate" TIMESTAMP(3) NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,
    "storageStatus" "StorageStatus" NOT NULL,
    "donorId" INTEGER NOT NULL,
    "hospitalId" INTEGER,
    "collectorId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BloodInventory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContactInfo_email_key" ON "ContactInfo"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Donor_addressId_key" ON "Donor"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "Donor_contactInfoId_key" ON "Donor"("contactInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "Hospital_addressId_key" ON "Hospital"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "Hospital_contactInfoId_key" ON "Hospital"("contactInfoId");

-- AddForeignKey
ALTER TABLE "Hospital" ADD CONSTRAINT "Hospital_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hospital" ADD CONSTRAINT "Hospital_contactInfoId_fkey" FOREIGN KEY ("contactInfoId") REFERENCES "ContactInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donor" ADD CONSTRAINT "Donor_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donor" ADD CONSTRAINT "Donor_contactInfoId_fkey" FOREIGN KEY ("contactInfoId") REFERENCES "ContactInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BloodInventory" ADD CONSTRAINT "BloodInventory_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "Donor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BloodInventory" ADD CONSTRAINT "BloodInventory_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BloodInventory" ADD CONSTRAINT "BloodInventory_collectorId_fkey" FOREIGN KEY ("collectorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
