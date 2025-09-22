import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET as string; // Should be in .env in production
const SALT_ROUNDS = 10;

export const hashPin = async (pin: string): Promise<string> => {
  return bcrypt.hash(pin, SALT_ROUNDS);
};

export const comparePin = async (pin: string, hashedPin: string): Promise<boolean> => {
  return bcrypt.compare(pin, hashedPin);
};

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '3h' });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};
