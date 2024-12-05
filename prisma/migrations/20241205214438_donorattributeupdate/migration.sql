/*
  Warnings:

  - You are about to drop the column `address` on the `Donor` table. All the data in the column will be lost.
  - Added the required column `city` to the `Donor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kebele` to the `Donor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subCity` to the `Donor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `woreda` to the `Donor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zone` to the `Donor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Donor" DROP COLUMN "address",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "kebele" TEXT NOT NULL,
ADD COLUMN     "subCity" TEXT NOT NULL,
ADD COLUMN     "woreda" TEXT NOT NULL,
ADD COLUMN     "zone" TEXT NOT NULL;
