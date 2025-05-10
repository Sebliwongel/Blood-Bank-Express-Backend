-- AlterTable
ALTER TABLE "Donor" ADD COLUMN     "resetToken" TEXT;

-- AlterTable
ALTER TABLE "Hospital" ADD COLUMN     "resetToken" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "resetToken" TEXT;
