import express from "express";
import {
  getMyProfile,
  updateMyProfile,
  getPublicProfile,
  getAllPublicProfiles,
} from "../controllers/UserProfile.js";
import { requireAuth } from "../middleware/auth.js";
import wrapAsync from "../utils/wrapAsync.js";

const router = express.Router();

router.get("/all", wrapAsync(getAllPublicProfiles));

router.get("/", requireAuth, wrapAsync(getMyProfile));
router.put("/update", requireAuth, wrapAsync(updateMyProfile));

router.get("/:clerkId", wrapAsync(getPublicProfile));

export default router;
