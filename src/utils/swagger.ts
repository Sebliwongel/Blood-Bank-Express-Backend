import fs from "fs";
import path from "path";
import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { userRegistry } from "../modules/User/userRegistry";
import { authRegistry } from "../modules/auth/authRegistry";
import { combineRegistries } from "./combineRegistries";
import { protectedRegistry } from "../modules/protected/registry/protectedRegistry";
import { inventoryRegistry } from "../modules/Inventory/InventoryRegistry";
import { systemAdminRegistry } from "../modules/systemAdmin/SystemAdminRegistry";
import { hospitalRegistry } from "../modules/Hospital/HospitalRegistry";
import { accountRegistry } from "../modules/Account/AccountRegistry";
import { bloodRegistry } from "../modules/Blood/BloodRegistry";
import { appointmentRegistry } from "../modules/Appointment/AppointmentRegistry";
import { notificationRegistry } from "../modules/Notification/NotificationRegistry";
import { orderRegistry } from "../modules/Order/OrderRegistry";
import { integrationRegistry } from "../modules/Integration/IntegrationRegistry";
import { reportRegistry } from "../modules/Report/ReportRegistry";
import { donationRegistry } from "../modules/Donation/DonationRegistry";
import { collectionRegistry } from "../modules/Collection/CollectionRegistry";
import { donorRegistry } from "../modules/donor/donorRegistry";
import { qualificationRegistry } from "../modules/Qulification/QulificationRegistry";

const combinedRegistry = combineRegistries(
  userRegistry,
  authRegistry,
  protectedRegistry,
  donorRegistry,
  qualificationRegistry,
  accountRegistry,
  inventoryRegistry,
  systemAdminRegistry,
  hospitalRegistry,
  bloodRegistry,
  appointmentRegistry,
  notificationRegistry,
  orderRegistry,
  integrationRegistry,
   reportRegistry,
   donationRegistry,
   collectionRegistry,
);

const generator = new OpenApiGeneratorV3(combinedRegistry.definitions);

export const openApiDoc = generator.generateDocument({
  openapi: "3.0.3",
  info: {
    title: "Example App",
    version: "0.0.0",
    description: "Example App API",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local",
    },
  ],
  security: [
    {
      BearerAuth: [],
    },
  ],
});

openApiDoc.components = {
  ...(generator.generateComponents().components || {}),
  securitySchemes: {
    BearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
};

const outputPath = path.resolve(__dirname, "../openapi.json");
fs.writeFileSync(outputPath, JSON.stringify(openApiDoc, null, 2), "utf-8");
