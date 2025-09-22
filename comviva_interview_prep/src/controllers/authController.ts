import { Request, Response } from 'express';
import db from '../models';
import { hashPin, comparePin, generateToken } from '../utils/auth';

const User = db.User;
const Account = db.Account;

export const register = async (req: Request, res: Response) => {
  const { phone_number, pin } = req.body;

  try {
    if (!phone_number || !pin) {
      return res.status(400).json({ message: 'Phone number and PIN are required.' });
    }

    const existingUser = await User.findOne({ where: { phone_number } });
    if (existingUser) {
      return res.status(409).json({ message: 'User with this phone number already exists.' });
    }

    const hashedPin = await hashPin(pin);

    const newUser = await User.create({
      phone_number,
      pin: hashedPin,
    });

    await Account.create({
      user_id: newUser.id,
      balance: 0.00, // Initial balance
    });

    res.status(201).json({ message: 'User registered successfully.', userId: newUser.id });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { phone_number, pin } = req.body;

  try {
    if (!phone_number || !pin) {
      return res.status(400).json({ message: 'Phone number and PIN are required.' });
    }

    const user = await User.findOne({ where: { phone_number } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid phone number or PIN.' });
    }

    const isPinValid = await comparePin(pin, user.pin);
    if (!isPinValid) {
      return res.status(401).json({ message: 'Invalid phone number or PIN.' });
    }

    const token = generateToken(user.id);

    res.status(200).json({ message: 'Login successful.', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
