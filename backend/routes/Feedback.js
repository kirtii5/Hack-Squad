import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import wrapAsync from '../utils/wrapAsync.js';
import {
    submitFeedback,
    getFeedbackForUser,
    getMyFeedbackGiven
} from '../controllers/Feedback.js';


const router = express.Router();

router.post('/', requireAuth, wrapAsync(submitFeedback));
router.get('/received/:userId', requireAuth, wrapAsync(getFeedbackForUser)); // for profile view
router.get('/given', requireAuth, wrapAsync(getMyFeedbackGiven)); // user dashboard

export default router;
