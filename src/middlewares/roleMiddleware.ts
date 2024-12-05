import dotenv from "dotenv";
dotenv.config();


import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? "your_secret_key";

export const checkRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // Assuming Bearer token

    if (!token) {
      return res.status(403).json({ error: "No token provided" });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
      if (roles.includes(decoded.role)) {
        next(); // Role matches, proceed to the next middleware or route handler
      } else {
        res.status(403).json({ error: "You do not have permission" });
      }
    } catch (error) {
      res.status(401).json({ error: "Invalid token" });
    }
  };
};
