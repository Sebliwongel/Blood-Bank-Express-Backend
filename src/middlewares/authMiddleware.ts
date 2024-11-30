// import { Request, Response, NextFunction } from "express";
// import { JwtPayload } from "jsonwebtoken";
// import { verifyToken } from "../modules/auth/authService";

// export interface AuthenticatedRequest extends Request {
//   user?: JwtPayload;
// }

// export const authMiddleware = (
//   req: AuthenticatedRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) {
//     return res.status(401).json({ error: "Authorization header missing" });
//   }

//   const token = authHeader.split(" ")[1];
//   const decoded = verifyToken(
//     token,
//     process.env.JWT_SECRET ?? "your_secret_key"
//   );

//   if (!decoded) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   req.user = decoded;
//   next();
// };



import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../modules/auth/authService";

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload; // Adding optional type to include decoded JWT payload.
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

    // Verify the token
    const decoded = verifyToken(token, process.env.JWT_SECRET ?? "your_secret_key");
    if (!decoded) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    // Attach the decoded user information to the request
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ error: "Internal server error during authentication" });
  }
};
