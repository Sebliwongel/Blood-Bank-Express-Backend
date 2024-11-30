import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { openApiDoc } from "./utils/swagger";
import { errorHandler } from "./middlewares/errorHandler";
import userRoutes from "./modules/User/userRoutes";
import authRoutes from "./modules/auth/authRoutes";
import protectedRoutes from "./modules/protected/routes/protectedRoutes";
import AccountRoutes from "./modules/Account/AccountRoutes";
import HospitalRoutes from "./modules/Hospital/HospitalRoutes";
import BloodRoutes from "./modules/Blood/BloodRoutes";
import inventoryRoutes from "./modules/Inventory/InventoryRoutes";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi/dist/zod-extensions";
import { z } from "zod";
import OrderRoutes from "./modules/Order/OrderRoutes";
import ReportRoutes from "./modules/Report/ReportRoutes";
//import DonationRoutes from "./modules/Donation/DonationRoutes";
import CollectionRoutes from "./modules/Collection/CollectionRoutes";
import IntegrationRoutes from "./modules/Integration/IntegrationRoutes";
import AppointmentRoutes from "./modules/Appointment/AppointmentRoutes";
import NotificationRoutes from "./modules/Notification/NotificationRoutes";
import QulificationRoutes from "./modules/Qulification/QulificationRoutes";
import donorRoutes from "./modules/donor/donorRoutes";
import roleRoutes from "./modules/role/roleroutes";

dotenv.config();

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(errorHandler);
app.get('/', (req, res) => {
  res.send('Welcome to the Blood Bank API!'); // Or any other response you'd like to show
});

// Routes
app.use("/api", userRoutes);
app.use("/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api", AccountRoutes);
app.use("/api", HospitalRoutes);
app.use("/api", BloodRoutes);
app.use("/api", inventoryRoutes);
//app.use("/api",HospitalRoutes);
//app.use("/api",BloodRoutes);
//app.use("/api",inventoryRoutes);
app.use("/api",AppointmentRoutes);
app.use("/api",NotificationRoutes);
app.use("/api",OrderRoutes);
app.use("/api",IntegrationRoutes);
app.use("/api",ReportRoutes);
//app.use("/api",DonationRoutes);
app.use("/api",CollectionRoutes);
app.use("/api",QulificationRoutes);
app.use("/api",donorRoutes);
app.use("/api", roleRoutes);
//app.use("/roles", roleRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDoc));

export default app;
