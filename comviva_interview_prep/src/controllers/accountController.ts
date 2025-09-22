import { Request, Response } from 'express';
import db from '../models';

const Account = db.Account;

interface AuthRequest extends Request {
  userId?: string;
}

export const getAccountBalance = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated.' });
    }

    const account = await Account.findOne({ where: { user_id: userId } });
    if (!account) {
      return res.status(404).json({ message: 'Account not found.' });
    }

    res.status(200).json({ balance: account.balance });
  } catch (error) {
    console.error('Error fetching account balance:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
