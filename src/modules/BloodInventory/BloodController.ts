import { Request, Response, NextFunction } from 'express';
import { createBlood, getAllBloods, getBloodById, updateBlood, deleteBlood, patchBlood } from './BloodService'; // Assuming service functions are available

// Controller for creating a new blood inventory
export const createBloodInventoryHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bloodData = req.body;  // Ensure to validate with schema before calling service
    const newBloodInventory = await createBlood(bloodData);
    res.status(201).json(newBloodInventory);
  } catch (error) {
    next(error);  // Pass error to global error handler
  }
};

// Controller for getting all blood inventories
export const getAllBloodsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bloodInventories = await getAllBloods();
    res.status(200).json(bloodInventories);
  } catch (error) {
    next(error);
  }
};

// Controller for getting a blood inventory by ID
export const getBloodByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bloodId = parseInt(req.params.id, 10);
    const bloodInventory = await getBloodById(bloodId);
    if (bloodInventory) {
      res.status(200).json(bloodInventory);
    } else {
      res.status(404).json({ message: 'Blood inventory not found' });
    }
  } catch (error) {
    next(error);
  }
};

// Controller for updating a blood inventory
export const updateBloodInventoryHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bloodId = parseInt(req.params.id, 10);
    const updatedData = req.body;  // Ensure you validate the body with schema
    const updatedBloodInventory = await updateBlood(bloodId, updatedData);
    res.status(200).json(updatedBloodInventory);
  } catch (error) {
    next(error);
  }
};

// Controller for deleting a blood inventory
export const deleteBloodInventoryHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bloodId = parseInt(req.params.id, 10);
    await deleteBlood(bloodId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Controller for patching (partial update) a blood inventory
export const patchBloodInventoryHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bloodId = parseInt(req.params.id, 10);
    const patchData = req.body;  // Ensure you validate the body
    const patchedBloodInventory = await patchBlood(bloodId, patchData);
    res.status(200).json(patchedBloodInventory);
  } catch (error) {
    next(error);
  }
};
