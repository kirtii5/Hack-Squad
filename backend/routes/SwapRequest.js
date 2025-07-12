import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import wrapAsync from '../utils/wrapAsync.js';

import {
  createSwapRequest,
  getMySwaps,
  acceptSwap,
  rejectSwap,
  cancelSwap
} from '../controllers/SwapRequest.js';

const router = express.Router();

router.post('/', requireAuth, wrapAsync(createSwapRequest));
router.get('/', requireAuth, wrapAsync(getMySwaps));
router.put('/:id/accept', requireAuth, wrapAsync(acceptSwap));
router.put('/:id/reject', requireAuth, wrapAsync(rejectSwap));
router.delete('/:id', requireAuth, wrapAsync(cancelSwap));

export default router;
