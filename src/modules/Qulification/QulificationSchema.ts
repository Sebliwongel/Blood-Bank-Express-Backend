import { z } from "zod";

// Schema for creating a new qualification record
export const NewQualificationSchema = z
  .object({
    donorId: z.number().int().openapi({ example: 123 }), // ID of the donor
    weight: z.number().positive().openapi({ example: 70.5 }), // Weight in kilograms
    pulse: z.number().positive().openapi({ example: 72 }), // Pulse rate in bpm
    hb: z.number().positive().openapi({ example: 13.5 }), // Hemoglobin level
    bp: z.string().openapi({ example: "120/80" }), // Blood pressure as a string
    temperature: z.number().positive().openapi({ example: 36.5 }), // Body temperature in Celsius

    lastDonationDate: z.string().datetime().optional().openapi({ example: "2024-06-15T10:00:00.000Z" }), // Last donation date (optional)
    hasDonatedBefore: z.boolean().openapi({ example: true }), // Whether the donor has donated before

    // Conditions within the last six months
    hasTattooing: z.boolean().openapi({ example: false }),
    hasEarPiercing: z.boolean().openapi({ example: false }),
    hadDentalExtraction: z.boolean().openapi({ example: false }),

    // Medical history questions
    hasHeartDisease: z.boolean().openapi({ example: false }),
    hasCancer: z.boolean().openapi({ example: false }),
    hasDiabetes: z.boolean().openapi({ example: false }),
    hasHepatitis: z.boolean().openapi({ example: false }),
    hasSTD: z.boolean().openapi({ example: false }),
    hadTyphoidLastYear: z.boolean().openapi({ example: false }),
    hasLungDisease: z.boolean().openapi({ example: false }),
    hasTuberculosis: z.boolean().openapi({ example: false }),
    hasAllergies: z.boolean().openapi({ example: false }),
    hasKidneyDisease: z.boolean().openapi({ example: false }),
    hasEpilepsy: z.boolean().openapi({ example: false }),
    hasAbnormalBleeding: z.boolean().openapi({ example: false }),
    hadJaundiceLastYear: z.boolean().openapi({ example: false }),
    hadMalariaSixMonths: z.boolean().openapi({ example: false }),
    hasFaintingSpells: z.boolean().openapi({ example: false }),

    // Medication and recent intake
    takenAntibiotics: z.boolean().openapi({ example: false }),
    takenSteroids: z.boolean().openapi({ example: false }),
    takenAspirin: z.boolean().openapi({ example: false }),
    hadVaccinations: z.boolean().openapi({ example: false }),
    consumedAlcohol: z.boolean().openapi({ example: false }),
    hadDogBiteVaccine: z.boolean().openapi({ example: false }),

    // Surgery and transfusion history
    hadSurgeryLastSixMonths: z.boolean().openapi({ example: false }),
    hadBloodTransfusionLastSixMonths: z.boolean().openapi({ example: false }),
  })
  .openapi("New Qualification");

// Schema for qualification details (with timestamps)
export const QualificationSchema = z
  .object({
    id: z.number().int().openapi({ example: 1 }), // Unique identifier for the qualification record
    donorId: z.number().int().openapi({ example: 123 }), // ID of the donor
    weight: z.number().positive().openapi({ example: 70.5 }),
    pulse: z.number().positive().openapi({ example: 72 }),
    hb: z.number().positive().openapi({ example: 13.5 }),
    bp: z.string().openapi({ example: "120/80" }),
    temperature: z.number().positive().openapi({ example: 36.5 }),

    lastDonationDate: z.string().datetime().optional().openapi({ example: "2024-06-15T10:00:00.000Z" }),
    hasDonatedBefore: z.boolean().openapi({ example: true }),

    hasTattooing: z.boolean().openapi({ example: false }),
    hasEarPiercing: z.boolean().openapi({ example: false }),
    hadDentalExtraction: z.boolean().openapi({ example: false }),

    hasHeartDisease: z.boolean().openapi({ example: false }),
    hasCancer: z.boolean().openapi({ example: false }),
    hasDiabetes: z.boolean().openapi({ example: false }),
    hasHepatitis: z.boolean().openapi({ example: false }),
    hasSTD: z.boolean().openapi({ example: false }),
    hadTyphoidLastYear: z.boolean().openapi({ example: false }),
    hasLungDisease: z.boolean().openapi({ example: false }),
    hasTuberculosis: z.boolean().openapi({ example: false }),
    hasAllergies: z.boolean().openapi({ example: false }),
    hasKidneyDisease: z.boolean().openapi({ example: false }),
    hasEpilepsy: z.boolean().openapi({ example: false }),
    hasAbnormalBleeding: z.boolean().openapi({ example: false }),
    hadJaundiceLastYear: z.boolean().openapi({ example: false }),
    hadMalariaSixMonths: z.boolean().openapi({ example: false }),
    hasFaintingSpells: z.boolean().openapi({ example: false }),

    takenAntibiotics: z.boolean().openapi({ example: false }),
    takenSteroids: z.boolean().openapi({ example: false }),
    takenAspirin: z.boolean().openapi({ example: false }),
    hadVaccinations: z.boolean().openapi({ example: false }),
    consumedAlcohol: z.boolean().openapi({ example: false }),
    hadDogBiteVaccine: z.boolean().openapi({ example: false }),

    hadSurgeryLastSixMonths: z.boolean().openapi({ example: false }),
    hadBloodTransfusionLastSixMonths: z.boolean().openapi({ example: false }),

    createdAt: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" }),
    updatedAt: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" }),
  })
  .openapi("Qualification");

// Schema for updating a qualification (all fields optional)
export const UpdateQualificationSchema = z
  .object({
    weight: z.number().positive().optional().openapi({ example: 71 }),
    pulse: z.number().positive().optional().openapi({ example: 74 }),
    hb: z.number().positive().optional().openapi({ example: 14 }),
    bp: z.string().optional().openapi({ example: "130/85" }),
    temperature: z.number().positive().optional().openapi({ example: 37 }),

    lastDonationDate: z.string().datetime().optional().openapi({ example: "2024-06-20T10:00:00.000Z" }),
    hasDonatedBefore: z.boolean().optional().openapi({ example: false }),

    hasTattooing: z.boolean().optional().openapi({ example: true }),
    hasEarPiercing: z.boolean().optional().openapi({ example: false }),
    hadDentalExtraction: z.boolean().optional().openapi({ example: true }),

    hasHeartDisease: z.boolean().optional().openapi({ example: false }),
    hasCancer: z.boolean().optional().openapi({ example: false }),
    hasDiabetes: z.boolean().optional().openapi({ example: true }),
    hasHepatitis: z.boolean().optional().openapi({ example: false }),
    hasSTD: z.boolean().optional().openapi({ example: false }),
    hadTyphoidLastYear: z.boolean().optional().openapi({ example: false }),
    hasLungDisease: z.boolean().optional().openapi({ example: false }),
    hasTuberculosis: z.boolean().optional().openapi({ example: false }),
    hasAllergies: z.boolean().optional().openapi({ example: true }),
    hasKidneyDisease: z.boolean().optional().openapi({ example: false }),
    hasEpilepsy: z.boolean().optional().openapi({ example: false }),
    hasAbnormalBleeding: z.boolean().optional().openapi({ example: false }),
    hadJaundiceLastYear: z.boolean().optional().openapi({ example: false }),
    hadMalariaSixMonths: z.boolean().optional().openapi({ example: false }),
    hasFaintingSpells: z.boolean().optional().openapi({ example: false }),

    takenAntibiotics: z.boolean().optional().openapi({ example: true }),
    takenSteroids: z.boolean().optional().openapi({ example: false }),
    takenAspirin: z.boolean().optional().openapi({ example: false }),
    hadVaccinations: z.boolean().optional().openapi({ example: true }),
    consumedAlcohol: z.boolean().optional().openapi({ example: false }),
    hadDogBiteVaccine: z.boolean().optional().openapi({ example: false }),

    hadSurgeryLastSixMonths: z.boolean().optional().openapi({ example: true }),
    hadBloodTransfusionLastSixMonths: z.boolean().optional().openapi({ example: false }),
  })
  .openapi("Update Qualification");
