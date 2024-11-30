// import { Request, Response } from "express";
// import { validateAndParse } from "../../utils/validateAndParseRequest";
// import { NewUserSchema } from "./userSchema";
// import { createUser } from "./userService";



// export const register = async (req: Request, res: Response) => {
//   try {
//     const parsed = await validateAndParse(NewUserSchema, req);
//     const newUser = await createUser(
//       parsed.name,
//       parsed.role,
//       parsed.email,
//       parsed.password
//     );
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to create user" });
//   }
// };

import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../../../prisma/prisma";


/**
 * Register a new user.
 */
export const register = async (req: Request, res: Response) => {
  const { email, password, role, ...otherDetails } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
        ...otherDetails,
      },
    });

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Get user profile for the authenticated user.
 */
export const getProfile = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id; // Assuming user ID is set in middleware.

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error("Profile Retrieval Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

