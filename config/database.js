import sqlite3 from "sqlite3";
import { open } from "sqlite";

let db;

export const initializeDb = async () => {
  db = await open({
    filename: "./database.sqlite",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS queries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      question TEXT,
      sqlQuery TEXT,
      result TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(userId) REFERENCES users(id)
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS employee (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      phone TEXT,
      position TEXT,
      salary INTEGER,
      hire_date DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await db.exec(`
    INSERT INTO employee (name, email, phone, position, salary) VALUES
      ('John Doe', 'john.doe@example.com', '1234567890', 'Software Engineer', 80000),
      ('Alice Smith', 'alice.smith@example.com', '2345678901', 'Project Manager', 95000),
      ('Bob Jones', 'bob.jones@example.com', '3456789012', 'UX Designer', 72000),
      ('Emma White', 'emma.white@example.com', '4567890123', 'HR Specialist', 60000),
      ('Michael Brown', 'michael.brown@example.com', '5678901234', 'Data Analyst', 75000),
      ('Sophia Wilson', 'sophia.wilson@example.com', '6789012345', 'Marketing Manager', 87000),
      ('Liam Miller', 'liam.miller@example.com', '7890123456', 'DevOps Engineer', 88000),
      ('Olivia Davis', 'olivia.davis@example.com', '8901234567', 'Cybersecurity Analyst', 92000),
      ('Noah Anderson', 'noah.anderson@example.com', '9012345678', 'Finance Manager', 89000),
      ('Isabella Clark', 'isabella.clark@example.com', '0123456789', 'IT Support', 65000)
    ON CONFLICT(email) DO NOTHING;
  `);

  console.log("SQLite Database Initialized ✅");
};

export const getDb = () => db;
