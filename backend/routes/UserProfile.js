import express from 'express';
import { requireAuth } from '../middleware/auth.js'; 
import wrapAsync from '../utils/wrapAsync.js';
import { getMyProfile, updateMyProfile } from '../controllers/UserProfile.js';

const router = express.Router();

router.get('/', requireAuth, wrapAsync(getMyProfile));
router.put('/update', requireAuth, wrapAsync(updateMyProfile));

export default router;
