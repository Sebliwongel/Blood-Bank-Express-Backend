import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all Qualifications
export const getAllQualifications = async () => {
  return await prisma.qualification.findMany();
};

// Get a Qualification by ID
export const getQualificationById = async (id: number) => {
  return await prisma.qualification.findUnique({
    where: { id },
  });
};

// Create a new Qualification
export const createQualification = async (
  donorId: number,
  weight: number,
  pulse: number,
  hb: number,
  bp: string,
  temperature: number,
  lastDonationDate?: Date,
  hasDonatedBefore?: boolean,
  hasTattooing?: boolean,
  hasEarPiercing?: boolean,
  hadDentalExtraction?: boolean,
  hasHeartDisease?: boolean,
  hasCancer?: boolean,
  hasDiabetes?: boolean,
  hasHepatitis?: boolean,
  hasSTD?: boolean,
  hadTyphoidLastYear?: boolean,
  hasLungDisease?: boolean,
  hasTuberculosis?: boolean,
  hasAllergies?: boolean,
  hasKidneyDisease?: boolean,
  hasEpilepsy?: boolean,
  hasAbnormalBleeding?: boolean,
  hadJaundiceLastYear?: boolean,
  hadMalariaSixMonths?: boolean,
  hasFaintingSpells?: boolean,
  takenAntibiotics?: boolean,
  takenSteroids?: boolean,
  takenAspirin?: boolean,
  hadVaccinations?: boolean,
  consumedAlcohol?: boolean,
  hadDogBiteVaccine?: boolean,
  hadSurgeryLastSixMonths?: boolean,
  hadBloodTransfusionLastSixMonths?: boolean
) => {
  return await prisma.qualification.create({
    data: {
      donorId,
      weight,
      pulse,
      hb,
      bp,
      temperature,
      lastDonationDate,
      hasDonatedBefore: hasDonatedBefore ?? false, // Default false if undefined
      hasTattooing: hasTattooing ?? false,
      hasEarPiercing: hasEarPiercing ?? false,
      hadDentalExtraction: hadDentalExtraction ?? false,
      hasHeartDisease: hasHeartDisease ?? false,
      hasCancer: hasCancer ?? false,
      hasDiabetes: hasDiabetes ?? false,
      hasHepatitis: hasHepatitis ?? false,
      hasSTD: hasSTD ?? false,
      hadTyphoidLastYear: hadTyphoidLastYear ?? false,
      hasLungDisease: hasLungDisease ?? false,
      hasTuberculosis: hasTuberculosis ?? false,
      hasAllergies: hasAllergies ?? false,
      hasKidneyDisease: hasKidneyDisease ?? false,
      hasEpilepsy: hasEpilepsy ?? false,
      hasAbnormalBleeding: hasAbnormalBleeding ?? false,
      hadJaundiceLastYear: hadJaundiceLastYear ?? false,
      hadMalariaSixMonths: hadMalariaSixMonths ?? false,
      hasFaintingSpells: hasFaintingSpells ?? false,
      takenAntibiotics: takenAntibiotics ?? false,
      takenSteroids: takenSteroids ?? false,
      takenAspirin: takenAspirin ?? false,
      hadVaccinations: hadVaccinations ?? false,
      consumedAlcohol: consumedAlcohol ?? false,
      hadDogBiteVaccine: hadDogBiteVaccine ?? false,
      hadSurgeryLastSixMonths: hadSurgeryLastSixMonths ?? false,
      hadBloodTransfusionLastSixMonths: hadBloodTransfusionLastSixMonths ?? false,
    },
  });
};

// Update a Qualification
export const updateQualification = async (
  qualificationId: number,
  updates: {
    donorId?: number;
    weight?: number;
    pulse?: number;
    hb?: number;
    bp?: string;
    temperature?: number;
    lastDonationDate?: Date;
    hasDonatedBefore?: boolean;
    hasTattooing?: boolean;
    hasEarPiercing?: boolean;
    hadDentalExtraction?: boolean;
    hasHeartDisease?: boolean;
    hasCancer?: boolean;
    hasDiabetes?: boolean;
    hasHepatitis?: boolean;
    hasSTD?: boolean;
    hadTyphoidLastYear?: boolean;
    hasLungDisease?: boolean;
    hasTuberculosis?: boolean;
    hasAllergies?: boolean;
    hasKidneyDisease?: boolean;
    hasEpilepsy?: boolean;
    hasAbnormalBleeding?: boolean;
    hadJaundiceLastYear?: boolean;
    hadMalariaSixMonths?: boolean;
    hasFaintingSpells?: boolean;
    takenAntibiotics?: boolean;
    takenSteroids?: boolean;
    takenAspirin?: boolean;
    hadVaccinations?: boolean;
    consumedAlcohol?: boolean;
    hadDogBiteVaccine?: boolean;
    hadSurgeryLastSixMonths?: boolean;
    hadBloodTransfusionLastSixMonths?: boolean;
  }
) => {
  const qualification = await prisma.qualification.findUnique({
    where: { id: qualificationId },
  });

  if (!qualification) {
    return null;
  }

  return await prisma.qualification.update({
    where: { id: qualificationId },
    data: {
      ...updates,
    },
  });
};

// Delete a Qualification
export const deleteQualification = async (id: number) => {
  return await prisma.qualification.delete({
    where: { id },
  });
};

import { Qualification } from "@prisma/client";

// Function to check if a donor meets qualification criteria
export const checkQualificationStatus = (qualification: Qualification): boolean => {
  // Example criteria logic to determine if the donor is qualified
  if (
    qualification.weight >= 50 && // Example minimum weight requirement
    qualification.hb >= 12.5 && // Example hemoglobin threshold
    !qualification.hasHeartDisease && // Example: no heart disease
    !qualification.hasHepatitis // Example: no hepatitis
  ) {
    return true;
  }
  return false;
};


