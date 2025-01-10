import express from 'express';
import {
  createUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  getUserByEmailHandler,
  updateUserHandler,
  deleteUserHandler,
  patchUserHandler,
} from './userController'; // Ensure correct import paths

const userRoutes = express.Router();

// Define routes and map them to the appropriate controller functions
userRoutes.post('/users', createUserHandler); // Creates a new user
userRoutes.get('/users', getAllUsersHandler); // Gets all users
userRoutes.get('/user/:id', getUserByIdHandler); // Gets a user by ID
userRoutes.get('/user/email/:email', getUserByEmailHandler); // Gets a user by email
userRoutes.put('/user/:id', updateUserHandler); // Updates a user by ID
userRoutes.delete('/user/:id', deleteUserHandler); // Deletes a user by ID
userRoutes.patch('/user/:id', patchUserHandler); // Partially updates a user by ID

export default userRoutes; // Export the router to be used in the main app

// To use this route in your main application, you can do:
// import userRoutes from './path-to-this-file';
// app.use('/api', userRoutes);
