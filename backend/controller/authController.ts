import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
export const loginController = (req: Request, res: Response): void => {
  const { userName, password } = req.body;
  const USER = process.env.USER;
  const PASSWORD = process.env.PASSWORD;
  if (userName == USER && password == PASSWORD) {
    res.status(200).json({ message: "Login successful", username: userName });
    return;
  } else {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }
};
