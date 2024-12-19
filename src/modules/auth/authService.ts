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

import * as bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getUserByEmail } from "../User/userService";
import { getDonorByEmail } from "../donor/donorService";
import dotenv from "dotenv";
dotenv.config();

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
export function generateToken(
  payload: object,
  secret: string,
  options: jwt.SignOptions | undefined
) {
  return jwt.sign(payload, secret, { ...(options && options) });
}

/**
 * Verify a token (access or refresh) using the provided secret.
 * @param token - The token to verify.
 * @param secret - The secret key to validate the token.
 * @returns The decoded token payload or null if verification fails.
 */
export const verifyToken = (
  token: string,
  secret: string
): JwtPayload | null => {
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
export const authenticateDonor = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const donor = await getDonorByEmail(email);
  console.log(donor);

  if (!donor)
    return {
      statusCode: 401,
      message: "User not found",
    };

  const isValidPassword = await bcrypt.compare(password, donor.password);
  console.log("is the password valid", isValidPassword)
  if (!isValidPassword)
    return {
      statusCode: 403,
      message: "Invalid Credentials",
    };

  // Include user ID and role in the JWT payload
  const payload = { donorId: donor.id ,};
  console.log("tokens", payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN!,
  });
  const accessToken = generateToken(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN!,
  });
  console.log(accessToken)
  const refreshToken = generateToken(payload, process.env.REFRESH_SECRET!, {
    expiresIn: process.env.REFRESH_EXPIRES_IN!,
  });
  console.log(refreshToken)

  return { accessToken, refreshToken };
};

/**
 * Refresh the access token using a valid refresh token.
 * @param refreshToken - The refresh token to validate.
 * @returns A new access token or null if the refresh token is invalid.
 */
export const refreshAccessToken = (refreshToken: string) => {
  const decoded = verifyToken(refreshToken, REFRESH_SECRET);

  if (!decoded || !decoded.userId || !decoded.role) return null;

  const newPayload = { userId: decoded.userId, role: decoded.role };

  const token = generateToken(newPayload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
  return token;
};
