/*
  Warnings:

  - You are about to drop the column `adminId` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Donor` table. All the data in the column will be lost.
  - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SystemAdmin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_IntegrationToInventory` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Donor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `Donor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Hospital` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `age` to the `Donor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthDate` to the `Donor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Donor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Donor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Donor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Donor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kebele` to the `Donor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Donor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Donor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subCity` to the `Donor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Donor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `woreda` to the `Donor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zone` to the `Donor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Donor" DROP CONSTRAINT "Donor_userId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_generatedBy_fkey";

-- DropForeignKey
ALTER TABLE "_IntegrationToInventory" DROP CONSTRAINT "_IntegrationToInventory_A_fkey";

-- DropForeignKey
ALTER TABLE "_IntegrationToInventory" DROP CONSTRAINT "_IntegrationToInventory_B_fkey";

-- DropIndex
DROP INDEX "Appointment_donorId_key";

-- DropIndex
DROP INDEX "Donor_userId_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "adminId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Donor" DROP COLUMN "userId",
ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "birthDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "cellPhone" TEXT,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "collectorId" INTEGER,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "kebele" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "medicalHistory" TEXT,
ADD COLUMN     "middleName" TEXT,
ADD COLUMN     "occupation" TEXT,
ADD COLUMN     "organization" TEXT,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "poBox" TEXT,
ADD COLUMN     "subCity" TEXT NOT NULL,
ADD COLUMN     "systemAdminId" INTEGER,
ADD COLUMN     "telephone" TEXT,
ADD COLUMN     "title" TEXT,
ADD COLUMN     "username" TEXT NOT NULL,
ADD COLUMN     "woreda" TEXT NOT NULL,
ADD COLUMN     "zone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Inventory" ADD COLUMN     "integrationId" INTEGER;

-- DropTable
DROP TABLE "Report";

-- DropTable
DROP TABLE "SystemAdmin";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "_IntegrationToInventory";

-- DropEnum
DROP TYPE "DonationStatus";

-- CreateTable
CREATE TABLE "SystemUser" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SystemUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SystemUser_email_key" ON "SystemUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Donor_email_key" ON "Donor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Donor_username_key" ON "Donor"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Hospital_email_key" ON "Hospital"("email");

-- AddForeignKey
ALTER TABLE "Donor" ADD CONSTRAINT "Donor_collectorId_fkey" FOREIGN KEY ("collectorId") REFERENCES "SystemUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donor" ADD CONSTRAINT "Donor_systemAdminId_fkey" FOREIGN KEY ("systemAdminId") REFERENCES "SystemUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "SystemUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "SystemUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_integrationId_fkey" FOREIGN KEY ("integrationId") REFERENCES "Integration"("id") ON DELETE SET NULL ON UPDATE CASCADE;
