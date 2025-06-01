import * as Brevo from '@getbrevo/brevo';
import { config } from '../config';
import fs from 'fs';
import path from 'path';

// Configure API key authorization
const apiInstance = new Brevo.TransactionalEmailsApi();
apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, config.brevo.apiKey);

const readTemplate = (templateName: string): string => {
  const templatePath = path.join(__dirname, '..', 'email_templates', templateName);
  return fs.readFileSync(templatePath, 'utf-8');
};

const replacePlaceholders = (template: string, replacements: Record<string, string>): string => {
  let result = template;
  for (const [key, value] of Object.entries(replacements)) {
    result = result.replace(new RegExp(`{{${key}}}`, 'g'), value);
  }
  return result;
};

export const sendVerificationEmail = async (email: string, verificationCode: string): Promise<void> => {
  try {
    const template = readTemplate('verification-email.html');
    const htmlContent = replacePlaceholders(template, {
      verificationCode,
      verificationUrl: `${config.frontendUrl}/verify-email?code=${verificationCode}&email=${email}`
    });

    const sendSmtpEmail = new Brevo.SendSmtpEmail();
    sendSmtpEmail.to = [{ email }];
    sendSmtpEmail.subject = 'Verify Your Email';
    sendSmtpEmail.htmlContent = htmlContent;
    sendSmtpEmail.sender = { name: 'Your App Name', email: config.brevo.senderEmail };

    await apiInstance.sendTransacEmail(sendSmtpEmail);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
};

export const sendPasswordResetEmail = async (email: string, resetCode: string): Promise<void> => {
  try {
    const template = readTemplate('reset-password-email.html');
    const htmlContent = replacePlaceholders(template, {
      resetCode,
      resetUrl: `${config.frontendUrl}/reset-password?code=${resetCode}&email=${email}`
    });

    const sendSmtpEmail = new Brevo.SendSmtpEmail();
    sendSmtpEmail.to = [{ email }];
    sendSmtpEmail.subject = 'Reset Your Password';
    sendSmtpEmail.htmlContent = htmlContent;
    sendSmtpEmail.sender = { name: 'Your App Name', email: config.brevo.senderEmail };

    await apiInstance.sendTransacEmail(sendSmtpEmail);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error('Failed to send password reset email');
  }
}; 