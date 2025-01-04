import { PrismaClient } from "@prisma/client";
import { NewAppointmentSchema, UpdateAppointmentSchema } from "./AppointmentSchema"; // Update path if necessary
import { z } from "zod";

const prisma = new PrismaClient();

// Service function to create a new appointment
export const createAppointment = async (data: z.infer<typeof NewAppointmentSchema>) => {
  try {
    // Validate input data against the schema
    const validatedData = NewAppointmentSchema.parse(data);

    // Create the appointment using Prisma
    const appointment = await prisma.appointment.create({
      data: {
        appointmentDate: validatedData.appointmentDate, // Changed to string
        status: validatedData.status,
        donorId: validatedData.donorId,
        location: validatedData.location, // Add location
        appointmentTime: validatedData.appointmentTime, // Changed to string
      },
    });

    return appointment;
  } catch (error) {
    throw new Error("Failed to create appointment: " + error);
  }
};

// Service function to update an existing appointment
export const updateAppointment = async (
  id: number,
  data: z.infer<typeof UpdateAppointmentSchema>
) => {
  try {
    // Validate input data against the update schema
    const validatedData = UpdateAppointmentSchema.parse(data);

    // Update the appointment using Prisma
    const appointment = await prisma.appointment.update({
      where: { id },
      data: {
        appointmentDate: validatedData.appointmentDate ?? undefined, // Changed to string
        status: validatedData.status ?? undefined,
        donorId: validatedData.donorId ?? undefined,
        location: validatedData.location ?? undefined, // Update location if provided
        appointmentTime: validatedData.appointmentTime ?? undefined, // Changed to string
      },
    });

    return appointment;
  } catch (error) {
    throw new Error("Failed to update appointment: " + error);
  }
};

// Service function to get an appointment by ID
export const getAppointmentById = async (id: number) => {
  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id },
    });

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    return appointment;
  } catch (error) {
    throw new Error("Failed to fetch appointment: " + error);
  }
};

// Service function to get all appointments
export const getAllAppointments = async () => {
  try {
    const appointments = await prisma.appointment.findMany();
    return appointments;
  } catch (error) {
    throw new Error("Failed to fetch appointments: " + error);
  }
};
