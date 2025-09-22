import { Request, Response } from 'express';
import db from '../models';
import { Transaction as SequelizeTransaction } from 'sequelize';

const User = db.User;
const Account = db.Account;
const Transaction = db.Transaction;

interface AuthRequest extends Request {
  userId?: string;
}

export const transferFunds = async (req: AuthRequest, res: Response) => {
  const { receiver_phone_number, amount } = req.body;
  const senderId = req.userId;

  try {
    if (!senderId) {
      return res.status(401).json({ message: 'User not authenticated.' });
    }

    if (!receiver_phone_number || !amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid receiver phone number or amount.' });
    }

    await db.sequelize.transaction(async (t: SequelizeTransaction) => {
      const senderAccount = await Account.findOne({ where: { user_id: senderId }, transaction: t });
      if (!senderAccount) {
        // No need for t.rollback() here, throwing an error will cause an automatic rollback
        throw new Error('Sender account not found.');
      }

      const receiverUser = await User.findOne({ where: { phone_number: receiver_phone_number }, transaction: t });
      if (!receiverUser) {
        throw new Error('Receiver user not found.');
      }

      if (senderId === receiverUser.id) {
        throw new Error('Cannot transfer funds to yourself.');
      }

      const receiverAccount = await Account.findOne({ where: { user_id: receiverUser.id }, transaction: t });
      if (!receiverAccount) {
        throw new Error('Receiver account not found.');
      }

      if (senderAccount.balance < amount) {
        throw new Error('Insufficient balance.');
      }

      // Perform transfer
      await senderAccount.update({ balance: parseFloat(senderAccount.balance.toString()) - amount }, { transaction: t });
      await receiverAccount.update({ balance: parseFloat(receiverAccount.balance.toString()) + amount }, { transaction: t });

      // Record transaction
      await Transaction.create(
        {
          sender_id: senderId,
          receiver_id: receiverUser.id,
          amount: amount,
          type: 'transfer',
          status: 'completed',
        },
        { transaction: t }
      );

      // Sequelize automatically commits if the callback finishes without error
      res.status(200).json({ message: 'Funds transferred successfully.' });
    });
  } catch (error: any) {
    // Sequelize handles rollback automatically if an error is thrown within the transaction callback
    console.error('Error during fund transfer:', error.message);
    // Send a more specific error message based on the thrown error
    let statusCode = 500;
    if (error.message.includes('not found')) {
      statusCode = 404;
    } else if (error.message.includes('Insufficient balance') || error.message.includes('Cannot transfer funds')) {
      statusCode = 400;
    }
    res.status(statusCode).json({ message: error.message });
  }
};

export const getTransactionHistory = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated.' });
    }

    const transactions = await Transaction.findAll({
      where: {
        // Fetch transactions where the user is either the sender or the receiver
        [db.Sequelize.Op.or]: [
          { sender_id: userId },
          { receiver_id: userId },
        ],
      },
      order: [['created_at', 'DESC']],
      include: [
        { model: User, as: 'sender', attributes: ['id', 'phone_number'] },
        { model: User, as: 'receiver', attributes: ['id', 'phone_number'] },
      ],
    });

    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
