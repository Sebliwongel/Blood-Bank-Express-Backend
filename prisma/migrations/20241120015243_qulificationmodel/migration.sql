/*
  Warnings:

  - You are about to drop the column `bloodtype` on the `Donor` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Donor_email_key";

-- DropIndex
DROP INDEX "Donor_username_key";

-- AlterTable
ALTER TABLE "Donor" DROP COLUMN "bloodtype",
ADD COLUMN     "collectorId" INTEGER;

-- CreateTable
CREATE TABLE "Qualification" (
    "id" SERIAL NOT NULL,
    "donorId" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "pulse" INTEGER NOT NULL,
    "hb" DOUBLE PRECISION NOT NULL,
    "bp" TEXT NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "lastDonationDate" TIMESTAMP(3),
    "hasDonatedBefore" BOOLEAN NOT NULL,
    "hasTattooing" BOOLEAN NOT NULL,
    "hasEarPiercing" BOOLEAN NOT NULL,
    "hadDentalExtraction" BOOLEAN NOT NULL,
    "hasHeartDisease" BOOLEAN NOT NULL,
    "hasCancer" BOOLEAN NOT NULL,
    "hasDiabetes" BOOLEAN NOT NULL,
    "hasHepatitis" BOOLEAN NOT NULL,
    "hasSTD" BOOLEAN NOT NULL,
    "hadTyphoidLastYear" BOOLEAN NOT NULL,
    "hasLungDisease" BOOLEAN NOT NULL,
    "hasTuberculosis" BOOLEAN NOT NULL,
    "hasAllergies" BOOLEAN NOT NULL,
    "hasKidneyDisease" BOOLEAN NOT NULL,
    "hasEpilepsy" BOOLEAN NOT NULL,
    "hasAbnormalBleeding" BOOLEAN NOT NULL,
    "hadJaundiceLastYear" BOOLEAN NOT NULL,
    "hadMalariaSixMonths" BOOLEAN NOT NULL,
    "hasFaintingSpells" BOOLEAN NOT NULL,
    "takenAntibiotics" BOOLEAN NOT NULL,
    "takenSteroids" BOOLEAN NOT NULL,
    "takenAspirin" BOOLEAN NOT NULL,
    "hadVaccinations" BOOLEAN NOT NULL,
    "consumedAlcohol" BOOLEAN NOT NULL,
    "hadDogBiteVaccine" BOOLEAN NOT NULL,
    "hadSurgeryLastSixMonths" BOOLEAN NOT NULL,
    "hadBloodTransfusionLastSixMonths" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Qualification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Donor" ADD CONSTRAINT "Donor_collectorId_fkey" FOREIGN KEY ("collectorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Qualification" ADD CONSTRAINT "Qualification_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "Donor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
