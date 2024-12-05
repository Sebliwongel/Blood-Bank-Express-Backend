/*
  Warnings:

  - You are about to drop the column `deactivatedAt` on the `Hospital` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Hospital` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "IntegrationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'HOSPITAL_REPRESENTATIVE';

-- AlterTable
ALTER TABLE "Hospital" DROP COLUMN "deactivatedAt",
DROP COLUMN "isActive";

-- AlterTable
ALTER TABLE "Integration" ADD COLUMN     "managerComment" TEXT,
ADD COLUMN     "managerId" INTEGER,
ADD COLUMN     "status" "IntegrationStatus" NOT NULL DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "accountType" TEXT NOT NULL,
    "accountStatus" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hospitalId" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "activationDate" TIMESTAMP(3),
    "deactivationDate" TIMESTAMP(3),

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Integration" ADD CONSTRAINT "Integration_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Donor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE SET NULL ON UPDATE CASCADE;
