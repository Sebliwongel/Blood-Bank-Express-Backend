//import { errorHandler } from '../middlewares/errorHandler';
import express from 'express';
import { createDonorHandler, getAllDonorsHandler, getDonorByIdHandler, getDonorByPhoneNumberHandler, updateDonorHandler, deleteDonorHandler, patchDonorHandler } from './donorController'; // Ensure correct import paths

const donorRoutes = express.Router();

// Define your routes and map them to the appropriate controller functions
donorRoutes.post('/donor', createDonorHandler); // Creates a new donor
donorRoutes.get('/donor', getAllDonorsHandler); // Gets all donors
donorRoutes.get('/donor/:id', getDonorByIdHandler); // Gets a donor by ID
donorRoutes.get('/donor/phone/:phoneNumber', getDonorByPhoneNumberHandler); // Gets a donor by phone number
donorRoutes.put('/donor/:id', updateDonorHandler); // Updates a donor by ID
donorRoutes.delete('/donor/:id', deleteDonorHandler); // Deletes a donor by ID
donorRoutes.patch('/donor/:id', patchDonorHandler); // Partially updates a donor by ID


export default donorRoutes; // Export the router to be used in the main app


// Error handler middleware
//app.use(errorHandler);


