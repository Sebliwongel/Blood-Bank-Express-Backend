import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
//import { UserRole } from "@prisma/client";

extendZodWithOpenApi(z)

const userRoles = [
  "SYSTEM_ADMIN",
  "COLLECTOR",
  "MANAGER",
  "STORE_MANAGER",
  "LABORATORY",
  
] as const;

export const UserSchema = z
  .object({
    id: z.number().openapi({ example: 1 }),
    name: z.string().openapi({ example: "JohnDoe" }),
    email: z.string().openapi({ example: "gogemekuse@gmail.com" }),
    role: z.enum(userRoles).openapi({ example: "SYSTEM_ADMIN" }),
    password: z.string().openapi({ example: "password123" }),
    username: z.string().openapi({example: "seblewengel"}),
    createdAt: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" }),
    updatedAt: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" }),
  })
  .openapi("User");

  // id            Int             @id @default(autoincrement())
  // name          String
  // email         String          @unique
  // role          UserRole
  // password      String
  // username      String
  // refreshToken  String?

export const NewUserSchema = z
  .object({
    name: z.string().openapi({ example: "Seblewengel Mamo" }),
    email: z.string().openapi({ example: "gogemekuse@gmail.com" }),
    role: z.enum(userRoles).openapi({ example: "SYSTEM_ADMIN" }),
    password: z.string().openapi({ example: "password123" }),
    username: z.string().openapi({example: "seblewengel"}),
  })
  .openapi("NewUser");

export type User = z.infer<typeof UserSchema>;
export type NewUser = z.infer<typeof NewUserSchema>;
