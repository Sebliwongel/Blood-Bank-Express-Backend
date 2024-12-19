import { Request, Response } from "express";

// A generic dashboard handler for all roles
export const dashboard = (req: Request, res: Response) => {
    // Ensure req.user exists and contains a role
    const user = req.user;
    
    if (!user || !user.role) {
        return res.status(400).json({ error: "Role information missing or invalid." });
    }

    const role = user.role;

    switch (role) {
        case "systemAdmin":
            res.json({ message: "Welcome to the Admin Dashboard!" });
            break;
        case "donor":
            res.json({ message: "Welcome to the Donor Dashboard!" });
            break;
        case "collector":
                res.json({ message: "Welcome to the Collector Dashboard!" });
                break;
        case "labTechnician":
            res.json({ message: "Welcome to the Lab Technician Dashboard!" });
            break;
        case "storeManager":
            res.json({ message: "Welcome to the Store Manager Dashboard!" });
            break;
        case "manager":
            res.json({ message: "Welcome to the Manager Dashboard!" });
            break;
        case "hospitalRepresentative":
            res.json({ message: "Welcome to the Hospital Representative Dashboard!" });
            break;
        default:
            // Log and send a clearer error message
            console.error(`Access denied for role: ${role}`);
            res.status(403).json({ error: "Access denied. Role not recognized." });
    }
};
