import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { getAccountBalance } from '../controllers/accountController';

const router = Router();

router.get('/balance', authenticateToken, getAccountBalance);

export default router;
