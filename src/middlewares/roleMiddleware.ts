import dotenv from "dotenv";
dotenv.config();

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not defined");
}

interface DecodedToken {
    role: string;
    [key: string]: any;
}

function getTokenFromHeaders(headers: Request["headers"]): string | null {
    const authHeader = headers["authorization"];
    if (authHeader?.startsWith("Bearer ")) {
        return authHeader.split(" ")[1];
    }
    return null;
}

export const checkRole = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = getTokenFromHeaders(req.headers);

        if (!token) {
            return res.status(403).json({ error: "No token provided" });
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

            if (roles.includes(decoded.role)) {
                return next(); // Role matches, proceed
            } else {
                return res.status(403).json({ error: "You do not have permission" });
            }
        } catch (error) {
            console.error("Token verification error:", error);
            return res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
        }
    };
};
