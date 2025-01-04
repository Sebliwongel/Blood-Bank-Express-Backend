-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "appointmentDate" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "BloodInventory" ALTER COLUMN "donationDate" SET DATA TYPE TEXT,
ALTER COLUMN "expirationDate" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "orderDate" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Qualification" ALTER COLUMN "lastDonationDate" SET DATA TYPE TEXT;
