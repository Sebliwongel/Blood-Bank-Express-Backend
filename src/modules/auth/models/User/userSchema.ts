// import { z } from "zod";
// import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
// import { UserRole } from "@prisma/client";

// extendZodWithOpenApi(z);

// const userRoles = [
//   "SYSTEM_ADMIN",
//   "DONOR",
//   "COLLECTOR",
//   "MANAGER",
//   "STORE_MANAGER",
//   "LABORATORY",
//   "HOSPITAL",
// ] as const;

// export const UserSchema = z
//   .object({
//     id: z.number().openapi({ example: 1 }),
//     name: z.string().openapi({ example: "JohnDoe" }),
//     email: z.string().openapi({ example: "gogemekuse@gmail.com" }),
//     role: z.enum(userRoles).openapi({ example: "SYSTEM_ADMIN" }),
//     password: z.string().openapi({ example: "password123" }),
//     createdAt: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" }),
//     updatedAt: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" }),
//   })
//   .openapi("User");

// export const NewUserSchema = z
//   .object({
//     name: z.string().openapi({ example: "Seblewengel Mamo" }),
//     email: z.string().openapi({ example: "gogemekuse@gmail.com" }),
//     role: z.enum(userRoles).openapi({ example: "SYSTEM_ADMIN" }),
//     password: z.string().openapi({ example: "password123" }),
//   })
//   .openapi("NewUser");

// export type User = z.infer<typeof UserSchema>;
// export type NewUser = z.infer<typeof NewUserSchema>;
