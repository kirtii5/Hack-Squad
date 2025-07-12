import express from "express";
import { createRequest } from "../controllers/Request.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", requireAuth, createRequest);

export default router;
