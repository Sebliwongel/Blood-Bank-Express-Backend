import express from 'express';
import { 
  createBloodInventoryHandler, 
  getAllBloodsHandler, 
  getBloodByIdHandler, 
  updateBloodInventoryHandler, 
  deleteBloodInventoryHandler, 
  patchBloodInventoryHandler ,
  saveBloodInventoryController
} from './BloodController'; // Ensure correct import paths

const bloodRoutes = express.Router();


bloodRoutes.post("/bloodinventory", saveBloodInventoryController);
// Define your routes and map them to the appropriate controller functions
bloodRoutes.post('/blood', createBloodInventoryHandler); // Creates a new blood inventory
bloodRoutes.get('/blood', getAllBloodsHandler); // Gets all blood inventories
bloodRoutes.get('/blood/:id', getBloodByIdHandler); // Gets a blood inventory by ID
bloodRoutes.put('/blood/:id', updateBloodInventoryHandler); // Updates a blood inventory by ID
bloodRoutes.delete('/blood/:id', deleteBloodInventoryHandler); // Deletes a blood inventory by ID
bloodRoutes.patch('/blood/:id', patchBloodInventoryHandler); // Partially updates a blood inventory by ID


export default bloodRoutes; // Export the router to be used in the main app
