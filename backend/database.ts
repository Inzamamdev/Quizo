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
    await pool.connect();
    console.log("PostgreSQL database connected");
  } catch (err) {
    console.error("Failed to connect to PostgreSQL", err);
    process.exit(1);
  }
};
