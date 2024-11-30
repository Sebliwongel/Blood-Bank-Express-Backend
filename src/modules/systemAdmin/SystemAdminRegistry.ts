// import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
// import { z } from "zod";
// import { AccessibleOpenAPIRegistry } from "../../utils/combineRegistries";
// import { SystemAdminSchema, NewSystemAdminSchema, UpdateSystemAdminSchema } from "./systemAdminSchema"; // Update the schema imports

// export const systemAdminRegistry = new AccessibleOpenAPIRegistry();

// systemAdminRegistry.register("SystemAdmin", SystemAdminSchema);
// systemAdminRegistry.register("NewSystemAdmin", NewSystemAdminSchema);

// // Register the POST path for creating a system admin
// systemAdminRegistry.registerPath({
//   method: "post",
//   path: "/api/system-admin",
//   summary: "Register a new system admin",
//   tags: ["SystemAdmin"],
//   request: {
//     body: {
//       content: {
//         "application/json": {
//           schema: NewSystemAdminSchema,
//         },
//       },
//     },
//   },
//   responses: {
//     201: {
//       description: "The created system admin",
//       content: {
//         "application/json": {
//           schema: SystemAdminSchema,
//         },
//       },
//     },
//   },
// });

// // Register the GET path for retrieving all system admins
// systemAdminRegistry.registerPath({
//   method: "get",
//   path: "/api/system-admin",
//   summary: "Get all system admins",
//   tags: ["SystemAdmin"],
//   responses: {
//     200: {
//       description: "A list of system admins",
//       content: {
//         "application/json": {
//           schema: z.array(SystemAdminSchema),
//         },
//       },
//     },
//   },
// });

// // Register the GET path for retrieving a system admin by ID
// systemAdminRegistry.registerPath({
//   method: "get",
//   path: "/api/system-admin/{id}",
//   summary: "Get a system admin by ID",
//   tags: ["SystemAdmin"],
//   parameters: [
//     {
//       name: "id",
//       in: "path",
//       required: true,
//       schema: { type: "string" }, // Assuming ID is a string
//     },
//   ],
//   responses: {
//     200: {
//       description: "The system admin with the specified ID",
//       content: {
//         "application/json": {
//           schema: SystemAdminSchema,
//         },
//       },
//     },
//     404: {
//       description: "System admin not found",
//     },
//   },
// });

// // Register the PATCH path for updating a system admin
// systemAdminRegistry.registerPath({
//   method: "patch",
//   path: "/api/system-admin/{id}",
//   summary: "Update a system admin",
//   tags: ["SystemAdmin"],
//   parameters: [
//     {
//       name: "id",
//       in: "path",
//       required: true,
//       schema: { type: "string" }, // Assuming ID is a string
//     },
//   ],
//   request: {
//     body: {
//       content: {
//         "application/json": {
//           schema: UpdateSystemAdminSchema,
//         },
//       },
//     },
//   },
//   responses: {
//     200: {
//       description: "The updated system admin",
//       content: {
//         "application/json": {
//           schema: SystemAdminSchema,
//         },
//       },
//     },
//     404: {
//       description: "System admin not found",
//     },
//   },
// });

// // Register the DELETE path for deleting a system admin
// systemAdminRegistry.registerPath({
//   method: "delete",
//   path: "/api/system-admin/{id}",
//   summary: "Delete a system admin",
//   tags: ["SystemAdmin"],
//   parameters: [
//     {
//       name: "id",
//       in: "path",
//       required: true,
//       schema: { type: "string" }, // Assuming ID is a string
//     },
//   ],
//   responses: {
//     204: {
//       description: "System admin deleted successfully",
//     },
//     404: {
//       description: "System admin not found",
//     },
//   },
// });
