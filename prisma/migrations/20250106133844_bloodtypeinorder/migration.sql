-- AlterTable
ALTER TABLE "BloodInventory" ADD COLUMN     "StockLevel" INTEGER;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "bloodType" "BloodType";

-- CreateTable
CREATE TABLE "Donation" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "bloodType" TEXT NOT NULL,
    "units" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "certificate" TEXT,
    "donorId" INTEGER NOT NULL,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "Donor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
