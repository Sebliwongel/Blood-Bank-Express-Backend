-- AlterTable
ALTER TABLE "BloodInventory" ALTER COLUMN "bloodType" DROP NOT NULL,
ALTER COLUMN "expirationDate" DROP NOT NULL,
ALTER COLUMN "storageStatus" DROP NOT NULL;
