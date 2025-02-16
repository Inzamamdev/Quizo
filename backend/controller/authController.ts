import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
});

export const loginController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userName, password } = req.body;
  try {
    const result = await pool.query(
      "SELECT id, username FROM users WHERE username = $1 AND password = $2",
      [userName, password]
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];
      res.status(200).json({ message: "Login successful", user });
      return;
    } else {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
