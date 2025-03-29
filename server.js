import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import queryRoutes from "./routes/queryRoutes.js";
import { initializeDb } from "./config/database.js";
import cookieParser from "cookie-parser"; 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const port = process.env.PORT || 5000;

// Initialize database
initializeDb();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/query", queryRoutes);

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
