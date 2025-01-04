/*
  Warnings:

  - Added the required column `appointmentTime` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "appointmentTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL;
