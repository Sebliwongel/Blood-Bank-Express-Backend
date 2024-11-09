import { Request, Response } from "express";
import { authenticateUser, refreshAccessToken } from "./authService";


export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const tokens = await authenticateUser(email, password);
  if (tokens) {
    res.json(tokens);
  } else {
    res.status(401).json({ error: "Invalid email or password" });
  }
};

export const refreshToken = (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  const newAccessToken = refreshAccessToken(refreshToken);
  if (newAccessToken) {
    res.json({ accessToken: newAccessToken });
  } else {
    res.status(401).json({ error: "Invalid refresh token" });
  }
};
