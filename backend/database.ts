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

// Function to connect to the database
export const connectDb = async () => {
  try {
    const client = await pool.connect();
    await client.query(`
      CREATE TABLE IF NOT EXISTS quizzes (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        teacher_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password TEXT NOT NULL
      );
    `);
    console.log("PostgreSQL database connected");
    console.log("✅ Tables checked/created");
  } catch (err) {
    console.error("Failed to connect to PostgreSQL", err);
    process.exit(1);
  }
};
