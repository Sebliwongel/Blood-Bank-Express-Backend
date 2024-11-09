import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all reports
export const getAllReports = async () => {
  try {
    return await prisma.report.findMany({
      include: {
        user: true, // Include the user details who generated the report
      },
    });
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw new Error("Failed to retrieve reports");
  }
};

// Get a report by ID
export const getReportById = async (id: number) => {
  try {
    return await prisma.report.findUnique({
      where: { id },
      include: {
        user: true, // Include user details who generated the report
      },
    });
  } catch (error) {
    console.error("Error fetching report by ID:", error);
    throw new Error("Failed to retrieve report");
  }
};

// Create a new report
export const createReport = async (title: string, content: string, generatedBy: number) => {
  try {
    return await prisma.report.create({
      data: {
        title,
        content,
        generatedBy,
      },
    });
  } catch (error) {
    console.error("Error creating report:", error);
    throw new Error("Failed to create report");
  }
};

// Update an existing report
export const updateReport = async (
  reportId: number,
  updates: { title?: string; content?: string; generatedBy?: number }
) => {
  try {
    const report = await prisma.report.findUnique({
      where: { id: reportId },
    });

    if (!report) {
      throw new Error("Report not found");
    }

    return await prisma.report.update({
      where: { id: reportId },
      data: {
        title: updates.title ?? report.title,
        content: updates.content ?? report.content,
        generatedBy: updates.generatedBy ?? report.generatedBy,
      },
    });
  } catch (error) {
    console.error("Error updating report:", error);
    throw new Error("Failed to update report");
  }
};

// Delete a report
export const deleteReport = async (id: number) => {
  try {
    return await prisma.report.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting report:", error);
    throw new Error("Failed to delete report");
  }
};
