import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import sqlite3 from "sqlite3";
import { promisify } from "util";

// Create SQLite database
const db = new sqlite3.Database('./quizo.db');

// Promisify database methods for async/await
const dbRun = promisify(db.run.bind(db));
const dbGet = promisify(db.get.bind(db));
const dbAll = promisify(db.all.bind(db));

// Function to connect to the database
export const connectDb = async () => {
  try {
    await dbRun(`
      CREATE TABLE IF NOT EXISTS quizzes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        teacher_id INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await dbRun(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(255) NOT NULL,
        password TEXT NOT NULL
      )
    `);

    // Insert default admin user if not exists
    const existingUser = await dbGet("SELECT * FROM users WHERE username = 'admin123'");
    if (!existingUser) {
      await dbRun("INSERT INTO users (username, password) VALUES ('admin123', 'admin123')");
    }

    console.log("SQLite database connected");
    console.log("✅ Tables checked/created");
  } catch (err) {
    console.error("Failed to connect to SQLite", err);
    process.exit(1);
  }
};

// Export database instance and helper functions
export { db, dbRun, dbGet, dbAll };