import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { openApiDoc } from "./utils/swagger";
import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./modules/auth/routes/authRoutes";
import protectedRoutes from "./modules/protected/routes/protectedRoutes";
import donorRoutes from "./modules/donor/donorRoutes";
import AccountRoutes from "./modules/Account/AccountRoutes";
import systemAdminRoutes  from "./modules/systemAdmin/SystemAdminRoutes";
import HospitalRoutes  from "./modules/Hospital/HospitalRoutes";
import BloodRoutes  from "./modules/Blood/BloodRoutes";
import AppointmentRoutes  from "./modules/Appointment/AppointmentRoutes";
import NotificationRoutes  from "./modules/Notification/NotificationRoutes";
import inventoryRoutes from "./modules/Inventory/InventoryRoutes";
import OrderRoutes from "./modules/Order/OrderRoutes";
import ReportRoutes from "./modules/Report/ReportRoutes";
import DonationRoutes from "./modules/Donation/DonationRoutes";
import CollectionRoutes from "./modules/Collection/CollectionRoutes";
import IntegrationRoutes from "./modules/Integration/IntegrationRoutes";
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

// Routes
app.use("/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api", donorRoutes);
app.use("/api", AccountRoutes);
app.use("/api",systemAdminRoutes);
app.use("/api",HospitalRoutes);
app.use("/api",BloodRoutes);
app.use("/api",inventoryRoutes);
app.use("/api",AppointmentRoutes);
app.use("/api",NotificationRoutes);
app.use("/api",OrderRoutes);
app.use("/api",IntegrationRoutes);
app.use("/api",ReportRoutes);
app.use("/api",DonationRoutes);
app.use("/api",CollectionRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDoc));

export default app;
