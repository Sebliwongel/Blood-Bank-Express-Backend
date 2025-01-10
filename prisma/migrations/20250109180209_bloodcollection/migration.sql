-- CreateTable
CREATE TABLE "BloodCollection" (
    "id" SERIAL NOT NULL,
    "bloodVolume" INTEGER NOT NULL,
    "vitals" TEXT NOT NULL,
    "donationTime" TIMESTAMP(3) NOT NULL,
    "barcode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "donorId" INTEGER NOT NULL,

    CONSTRAINT "BloodCollection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BloodCollection" ADD CONSTRAINT "BloodCollection_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "Donor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
