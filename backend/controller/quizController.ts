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

export const getQuizById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Fetch quiz from database
    const quiz = await pool.query("SELECT * FROM quizzes WHERE id = $1", [id]);

    if (quiz.rowCount === 0) {
      res.status(404).json({ error: "Quiz not found" });
      return;
    }

    res.json(quiz.rows[0]);
  } catch (error) {
    console.error("Error fetching quiz:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateQuiz = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, teacher_id } = req.body;

    // Update the quiz in the database
    const updatedQuiz = await pool.query(
      "UPDATE quizzes SET title = $1, description = $2  WHERE id = $3 AND teacher_id = $4 RETURNING *",
      [title, description, id, teacher_id]
    );

    if (updatedQuiz.rowCount === 0) {
      res.status(404).json({ error: "Quiz not found or unauthorized" });
      return;
    }

    res.json({
      message: "Quiz updated successfully",
      quiz: updatedQuiz.rows[0],
    });
  } catch (error) {
    console.error("Error updating quiz:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteQuiz = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Delete the quiz from the database
    const query = "DELETE FROM quizzes WHERE id = $1 RETURNING *";
    const result = await pool.query(query, [id]);

    if (result.rowCount === 0) {
      res.status(404).json({ error: "Quiz not found" });
      return;
    }

    res.json({ message: "Quiz deleted successfully" });
  } catch (error) {
    console.error("Error deleting quiz:", error);
    res.status(500).json({ error: "Server error" });
  }
};
