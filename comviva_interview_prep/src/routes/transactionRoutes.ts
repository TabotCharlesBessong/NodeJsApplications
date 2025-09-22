import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { transferFunds, getTransactionHistory } from '../controllers/transactionController';

const router = Router();

router.post('/transfer', authenticateToken, transferFunds);
router.get('/', authenticateToken, getTransactionHistory);

export default router;
