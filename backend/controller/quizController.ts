import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
});

export const createQuiz = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, description, teacher_id } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO quizzes (title, description, teacher_id) VALUES ($1, $2, $3) RETURNING *",
      [title, description, teacher_id]
    );

    res
      .status(201)
      .json({ message: "Quiz created successfully", quiz: result.rows[0] });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getQuizzes = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM quizzes");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ error: "Server error" });
  }
};
