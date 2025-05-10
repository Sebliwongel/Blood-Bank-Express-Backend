// import { Request, Response, NextFunction } from "express";
// import { UserPayload } from "../types";
// import { verifyToken } from "../modules/auth/authService";

// // Extend the Request type to include the `user` property
// export interface AuthenticatedRequest extends Request {
//   user?: UserPayload;
// }

// export const authMiddleware = (
//   req: AuthenticatedRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const authHeader = req.headers.authorization;

//     // Check if the Authorization header is present
//     if (!authHeader) {
//       return res.status(401).json({ error: "Authorization header missing" });
//     }

//     // Extract the token from the header (assuming 'Bearer <token>' format)
//     const token = authHeader.split(" ")[1];
//     if (!token) {
//       return res.status(401).json({ error: "Token missing in Authorization header" });
//     }

//     // Verify the token and ensure it matches the UserPayload structure
//     const decoded = verifyToken(token, process.env.JWT_SECRET ?? "your_secret_key") as UserPayload;

//     if (!decoded || !decoded.id || !decoded.role || !decoded.model) {
//       return res.status(401).json({ error: "Invalid or malformed token payload" });
//     }

//     // Attach the decoded user information to the request
//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.error("Authentication error:", error);
//     res.status(500).json({ error: "Internal server error during authentication" });
//   }
// };


import { Request, Response, NextFunction } from "express";
import { UserPayload } from "../types";
import { verifyToken } from "../modules/auth/authService";

// Extend the Request type to include the `user` property
export interface AuthenticatedRequest extends Request {
  user?: UserPayload;
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if the Authorization header is present
    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    // Extract the token from the header (assuming 'Bearer <token>' format)
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token missing in Authorization header" });
    }

    // Verify the token and ensure it matches the UserPayload structure
    const decoded = verifyToken(token, process.env.JWT_SECRET ?? "your_secret_key") as UserPayload;

    if (!decoded || !decoded.id || !decoded.role || !decoded.model) {
      return res.status(401).json({ error: "Invalid or malformed token payload" });
    }

    // Parse the `id` as a number to ensure compatibility with Prisma
    const numericId = typeof decoded.id === "string" ? parseInt(decoded.id, 10) : decoded.id;

    if (!numericId || isNaN(numericId)) {
      return res.status(401).json({ error: "Invalid user ID in token payload" });
    }

    // Attach the decoded user information to the request, including the parsed ID
    req.user = { ...decoded, id: numericId };
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ error: "Internal server error during authentication" });
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'systemAdmin') {
    return next();
  }

  return res.status(403).json({ message: 'Forbidden: Admins only' });
};