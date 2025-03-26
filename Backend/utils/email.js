// utils/email.js
const nodemailer = require('nodemailer');

// Create a transporter object using your email service's SMTP settings
const transporter = nodemailer.createTransport({
  host: 'YOUR_EMAIL_HOST', // e.g., smtp.gmail.com
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'YOUR_EMAIL_USERNAME',
    pass: 'YOUR_EMAIL_PASSWORD',
  },
});

exports.sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: 'YOUR_SENDER_EMAIL', // Sender address
      to, // List of recipients
      subject, // Subject line
      text, // Plain text body
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};