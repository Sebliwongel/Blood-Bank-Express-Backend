import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all appointments
export const getAllAppointments = async () => {
  return await prisma.appointment.findMany({
    include: {
      donor: true, // Optionally include the related donor information
    },
  });
};

// Get an appointment by ID
export const getAppointmentById = async (id: number) => {
  return await prisma.appointment.findUnique({
    where: { id },
    include: {
      donor: true, // Optionally include the related donor information
    },
  });
};

// Create a new appointment
export const createAppointment = async (
  appointmentDate: Date,
  status: string,
  donorId: number
) => {
  return await prisma.appointment.create({
    data: {
      appointmentDate,
      status,
      donorId,
    },
  });
};

// Update an existing appointment
export const updateAppointment = async (
  appointmentId: number,
  updates: { appointmentDate?: Date; status?: string; donorId?: number }
) => {
  // First, find the appointment by ID
  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId },
  });

  // If the appointment does not exist, return null or handle accordingly
  if (!appointment) {
    return null;
  }

  // Update the appointment with the provided fields
  return await prisma.appointment.update({
    where: { id: appointmentId },
    data: {
      appointmentDate: updates.appointmentDate ?? appointment.appointmentDate, // Preserve existing if not provided
      status: updates.status ?? appointment.status, // Preserve existing if not provided
      donorId: updates.donorId ?? appointment.donorId, // Preserve existing if not provided
    },
  });
};

// Delete an appointment by ID
export const deleteAppointment = async (id: number) => {
  return await prisma.appointment.delete({
    where: { id },
  });
};
