import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDb } from "../config/database.js";

export const registerUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const db = getDb();

  try {
    await db.run("INSERT INTO users (username, password) VALUES (?, ?)", [
      username,
      hashedPassword,
    ]);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ message: "Username already exists" });
  }
};


export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const db = getDb();
    const user = await db.get("SELECT * FROM users WHERE username = ?", [username]);
  
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  
    // Generate JWT Token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
    // Set token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevents JavaScript access (More secure)
      secure: process.env.NODE_ENV === "production", // Use HTTPS in production
      sameSite: "strict", // Prevent CSRF attacks
      maxAge: 3600000, // 1 hour expiration
    });
  
    res.json({ message: "Login successful", token });
  };
  
