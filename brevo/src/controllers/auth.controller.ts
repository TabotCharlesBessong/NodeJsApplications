import { Request, Response } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import { User } from '../models/User';
import { config } from '../config';
import { sendVerificationEmail, sendPasswordResetEmail } from '../services/email.service';
import { generateVerificationCode } from '../utils/helpers';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Generate verification code
    const verificationCode = generateVerificationCode();
    const verificationCodeExpires = new Date(Date.now() + 3600000); // 1 hour

    // Create new user
    const user = new User({
      email,
      password,
      verificationCode,
      verificationCodeExpires,
    });

    await user.save();

    // Send verification email
    await sendVerificationEmail(email, verificationCode);

    res.status(201).json({ message: 'Registration successful. Please check your email for verification.' ,user});
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({
      email,
      verificationCode: code,
      verificationCodeExpires: { $gt: Date.now() },
    });

    if (!user) {
      res.status(400).json({ message: 'Invalid or expired verification code' });
      return;
    }

    user.isVerified = true;
    user.verificationCode = '';
    user.verificationCodeExpires = new Date();
    await user.save();

    res.json({ message: 'Email verified successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    if (!user.isVerified) {
      res.status(401).json({ message: 'Please verify your email first' });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      { userId: user._id },
      config.jwtSecret as jwt.Secret,
      { expiresIn: config.jwtExpiresIn } as SignOptions
    );

    res.json({ token });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const resetCode = generateVerificationCode();
    user.resetPasswordToken = resetCode;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    await sendPasswordResetEmail(email, resetCode);

    res.json({ message: 'Password reset code sent to your email' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, code, password } = req.body;

    const user = await User.findOne({
      email,
      resetPasswordToken: code,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      res.status(400).json({ message: 'Invalid or expired reset code' });
      return;
    }

    user.password = password;
    user.resetPasswordToken = '';
    user.resetPasswordExpires = new Date();
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}; 