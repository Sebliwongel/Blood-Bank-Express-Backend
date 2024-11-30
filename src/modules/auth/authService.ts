// import bcrypt from "bcrypt";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import { getUserByEmail } from "../User/userService";

// const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
// const REFRESH_SECRET = process.env.REFRESH_SECRET || "your_refresh_secret";
// const JWT_EXPIRES_IN = "15m";
// const REFRESH_EXPIRES_IN = "7d";

// /**
//  * Authenticate a user using email and password, and generate access and refresh tokens.
//  * @param username - The user's email.
//  * @param password - The user's password.
//  * @returns An object with access and refresh tokens or null if authentication fails.
//  */
// export const authenticateUser = async (usernamel: string, password: string) => {
//   const user = await getUserByEmail(usernamel);

//   if (!user) return null;

//   const isValidPassword = await bcrypt.compare(password, user.password);
//   if (!isValidPassword) return null;

//   // Include user ID and role in the JWT payload
//   const payload = { userId: user.id, role: user.role };

//   const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
//   const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN });

//   return { accessToken, refreshToken };
// };

// /**
//  * Verify a token (access or refresh) using the provided secret.
//  * @param token - The token to verify.
//  * @param secret - The secret key to validate the token.
//  * @returns The decoded token payload or null if verification fails.
//  */
// export const verifyToken = (token: string, secret: string): JwtPayload | null => {
//   try {
//     return jwt.verify(token, secret) as JwtPayload;
//   } catch (error) {
//     return null;
//   }
// };

// /**
//  * Refresh the access token using a valid refresh token.
//  * @param refreshToken - The refresh token to validate.
//  * @returns A new access token or null if the refresh token is invalid.
//  */
// export const refreshAccessToken = (refreshToken: string) => {
//   const decoded = verifyToken(refreshToken, REFRESH_SECRET);

//   if (!decoded || !decoded.userId || !decoded.role) return null;

//   const newPayload = { userId: decoded.userId, role: decoded.role };

//   return jwt.sign(newPayload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
// };

import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getUserByEmail } from "../User/userService";

// Environment variables and default fallback values
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "your_refresh_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "15m";
const REFRESH_EXPIRES_IN = process.env.REFRESH_EXPIRES_IN || "7d";

/**
 * Generate a token (access or refresh) using the provided payload, secret, and expiration time.
 * @param payload - The payload to include in the token.
 * @param secret - The secret key to sign the token.
 * @param expiresIn - The token's expiration time (e.g., "15m", "7d").
 * @returns The generated JWT token.
 */
export const generateToken = (payload: object, secret: string, expiresIn: string): string => {
  return jwt.sign(payload, secret, { expiresIn });
};

/**
 * Verify a token (access or refresh) using the provided secret.
 * @param token - The token to verify.
 * @param secret - The secret key to validate the token.
 * @returns The decoded token payload or null if verification fails.
 */
export const verifyToken = (token: string, secret: string): JwtPayload | null => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};

/**
 * Authenticate a user using email and password, and generate access and refresh tokens.
 * @param email - The user's username or email.
 * @param password - The user's password.
 * @returns An object with access and refresh tokens or null if authentication fails.
 */
export const authenticateUser = async (username: string, password: string) => {
  const user = await getUserByEmail(username);

  if (!user) return null;

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) return null;

  // Include user ID and role in the JWT payload
  const payload = { userId: user.id, role: user.role };

  const accessToken = generateToken(payload, JWT_SECRET, JWT_EXPIRES_IN);
  const refreshToken = generateToken(payload, REFRESH_SECRET, REFRESH_EXPIRES_IN);

  return { accessToken, refreshToken };
};

/**
 * Refresh the access token using a valid refresh token.
 * @param refreshToken - The refresh token to validate.
 * @returns A new access token or null if the refresh token is invalid.
 */
export const refreshAccessToken = (refreshToken: string): string | null => {
  const decoded = verifyToken(refreshToken, REFRESH_SECRET);

  if (!decoded || !decoded.userId || !decoded.role) return null;

  const newPayload = { userId: decoded.userId, role: decoded.role };

  return generateToken(newPayload, JWT_SECRET, JWT_EXPIRES_IN);
};
