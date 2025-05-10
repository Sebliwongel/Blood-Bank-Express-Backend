import { Request, Response, NextFunction } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  patchUser,
} from "./userService"; // Assuming service functions are available

// Controller for creating a new user
export const createUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body; // Ensure to validate with schema before calling service
    const newUser = await createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    next(error); // Pass error to global error handler
  }
};

// Controller for getting all users
export const getAllUsersHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Controller for getting a user by ID
export const getUserByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const user = await getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Controller for getting a user by email
export const getUserByEmailHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.params.email;
    const user = await getUserByEmail(email);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Controller for updating a user
export const updateUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const updatedData = req.body; // Ensure you validate the body with schema
    const updatedUser = await updateUser(userId, updatedData);
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// Controller for deleting a user
export const deleteUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = parseInt(req.params.id, 10);
    await deleteUser(userId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Controller for patching (partial update) a user
export const patchUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const patchData = req.body; // Ensure you validate the body
    const patchedUser = await patchUser(userId, patchData);
    res.status(200).json(patchedUser);
  } catch (error) {
    next(error);
  }
};
