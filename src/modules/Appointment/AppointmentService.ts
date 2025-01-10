import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Service function to create an appointment
export const createAppointment = async (data: {
  appointmentDate: string;
  status: string;
  location: string;
  appointmentTime: string;
}) => {
  try {
    // Retrieve the latest donor ID from the database
    const latestDonor = await prisma.donor.findFirst({
      orderBy: {
        id: "desc",
      },
    });

    if (!latestDonor) {
      throw new Error("No donors found in the system.");
    }

    const donorId = latestDonor.id;

    const appointment = await prisma.appointment.create({
      data: {
        appointmentDate: data.appointmentDate,
        status: data.status,
        donorId: donorId, // Assign the donor ID automatically
        location: data.location,
        appointmentTime: data.appointmentTime,
      },
    });

    return appointment;
  } catch (error) {
    throw new Error("Failed to create appointment: " + error);
  }
};

// Service function to get scheduled appointments
export const getScheduledAppointments = async (req: any, res: any) => {
  try {
    const appointments = await prisma.appointment.findMany({
      where: { status: "Scheduled" },
      include: {
        donor: {
          include: { qualifications: true },
        },
      },
    });
    res.status(200).json(appointments);
  } catch (error: unknown) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Service function to update an existing appointment
export const updateAppointment = async (
  id: number,
  data: {
    appointmentDate?: string;
    status?: string;
    location?: string;
    appointmentTime?: string;
  }
) => {
  try {
    const appointment = await prisma.appointment.update({
      where: { id },
      data: {
        appointmentDate: data.appointmentDate,
        status: data.status,
        location: data.location,
        appointmentTime: data.appointmentTime,
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
