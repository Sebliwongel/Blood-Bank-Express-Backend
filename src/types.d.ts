declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}

export interface UserPayload {
    id:number; // Common identifier
    role: "systemAdmin" | "donor" | "labTechnician" | "storeManager" | "manager" | "hospitalRepresentative"| "collector";
    model: "User" | "Donor" | "Hospital"; // Indicates the model the user belongs to
    [key: string]: any; // Allows additional fields
}
