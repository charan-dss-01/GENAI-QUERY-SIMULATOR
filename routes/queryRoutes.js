import express from "express";
import { processQuery, explainQuery, validateQuery } from "../controllers/queryController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect AI Query Endpoints using authenticateToken middleware
router.post("/query", authenticateToken, processQuery);
router.post("/explain", authenticateToken, explainQuery);
router.post("/validate", authenticateToken, validateQuery);

export default router;
