/*
  Warnings:

  - You are about to drop the column `bloodDetails` on the `Order` table. All the data in the column will be lost.
  - Added the required column `aNegAmount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `aPosAmount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `abNegAmount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `abPosAmount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bNegAmount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bPosAmount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oNegAmount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oPosAmount` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "bloodDetails",
ADD COLUMN     "aNegAmount" INTEGER NOT NULL,
ADD COLUMN     "aPosAmount" INTEGER NOT NULL,
ADD COLUMN     "abNegAmount" INTEGER NOT NULL,
ADD COLUMN     "abPosAmount" INTEGER NOT NULL,
ADD COLUMN     "bNegAmount" INTEGER NOT NULL,
ADD COLUMN     "bPosAmount" INTEGER NOT NULL,
ADD COLUMN     "oNegAmount" INTEGER NOT NULL,
ADD COLUMN     "oPosAmount" INTEGER NOT NULL;
