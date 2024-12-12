import { PrismaClient } from "@prisma/client";
import { CreateHospitalSchema, UpdateHospitalSchema } from "./HospitalSchema";
import { z } from "zod";

const prisma = new PrismaClient();

type CreateHospitalInput = z.infer<typeof CreateHospitalSchema>;
type UpdateHospitalInput = z.infer<typeof UpdateHospitalSchema>;

// Get all hospitals
export const getAllHospitals = async () => {
  return await prisma.hospital.findMany({
    orderBy: { name: 'asc' }
  });
};

// Get a single hospital by ID
export const getHospital = async (hospitalId: number) => {
  const hospital = await prisma.hospital.findUnique({
    where: { id: hospitalId },
  });

  if (!hospital) {
    return null; // Let controller handle 404
  }

  return hospital;
};

// Create a new Hospital
export const createHospital = async (hospitalData: CreateHospitalInput) => {
  return await prisma.hospital.create({
    data: {
      ...hospitalData
    },
  });
};

// Update an existing Hospital
export const updateHospital = async (
  hospitalId: number,
  updates: UpdateHospitalInput
) => {
  const hospital = await prisma.hospital.findUnique({
    where: { id: hospitalId },
  });

  if (!hospital) {
    return null; // Let controller handle 404
  }

  return await prisma.hospital.update({
    where: { id: hospitalId },
    data: {
      name: updates.name !== undefined ? updates.name : hospital.name,
      address: updates.address !== undefined ? updates.address : hospital.address,
      email: updates.email !== undefined ? updates.email : hospital.email,
      username: updates.username !== undefined ? updates.username : hospital.username,
      password: updates.password !== undefined ? updates.password : hospital.password,
      //isActive: updates.isActive !== undefined ? updates.isActive : hospital.isActive,
      //deactivatedAt: updates.deactivatedAt !== undefined ? updates.deactivatedAt : hospital.deactivatedAt,
    },
  });
};

// Patch (Partial Update) Hospital
export const patchHospital = async (
  hospitalId: number,
  updates: Partial<UpdateHospitalInput>
) => {
  const hospital = await prisma.hospital.findUnique({
    where: { id: hospitalId },
  });

  if (!hospital) {
    return null; // Let controller handle 404
  }

  return await prisma.hospital.update({
    where: { id: hospitalId },
    data: {
      name: updates.name !== undefined ? updates.name : hospital.name,
      address: updates.address !== undefined ? updates.address : hospital.address,
      email: updates.email !== undefined ? updates.email : hospital.email,
      username: updates.username !== undefined ? updates.username : hospital.username,
      password: updates.password !== undefined ? updates.password : hospital.password,
      //isActive: updates.isActive !== undefined ? updates.isActive : hospital.isActive,
      //deactivatedAt: updates.deactivatedAt !== undefined ? updates.deactivatedAt : hospital.deactivatedAt,
    },
  });
};

// Delete a hospital
export const deleteHospital = async (hospitalId: number) => {
  const hospital = await prisma.hospital.findUnique({
    where: { id: hospitalId },
  });

  if (!hospital) {
    return null; // Let controller handle 404
  }

  return await prisma.hospital.delete({
    where: { id: hospitalId },
  });
};