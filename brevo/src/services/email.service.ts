import * as SibApiV3Sdk from '@getbrevo/brevo';
import { config } from '../config';

// Configure API key authorization
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, config.brevo.apiKey);

export const sendVerificationEmail = async (email: string, code: string) => {
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  
  sendSmtpEmail.to = [{ email }];
  sendSmtpEmail.subject = 'Email Verification';
  sendSmtpEmail.htmlContent = `
    <h1>Email Verification</h1>
    <p>Your verification code is: <strong>${code}</strong></p>
    <p>This code will expire in 1 hour.</p>
  `;
  sendSmtpEmail.sender = { name: 'Auth App', email: config.brevo.senderEmail };

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
};

export const sendPasswordResetEmail = async (email: string, code: string) => {
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  
  sendSmtpEmail.to = [{ email }];
  sendSmtpEmail.subject = 'Password Reset';
  sendSmtpEmail.htmlContent = `
    <h1>Password Reset</h1>
    <p>Your password reset code is: <strong>${code}</strong></p>
    <p>This code will expire in 1 hour.</p>
  `;
  sendSmtpEmail.sender = { name: 'Auth App', email: config.brevo.senderEmail };

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error('Failed to send password reset email');
  }
}; 