import { Request, Response } from "express";
import { validateAndParse } from "../../utils/validateAndParseRequest";
import { NewUserSchema } from "./userSchema";
import { createUser } from "./userService";



export const register = async (req: Request, res: Response) => {
  try {
    const parsed = await validateAndParse(NewUserSchema, req);
    const newUser = await createUser(
      parsed.name,
      parsed.role,
      parsed.email,
      parsed.password
    );
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};
