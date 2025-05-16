const nodemailer = require('nodemailer');

// Configure your transporter (using Gmail as an example)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // your Gmail email
    pass: process.env.EMAIL_PASS, // your Gmail app password (not your account password)
  },
});

/**
 * Sends an OTP email to the specified address.
 * @param {string} toEmail - Recipient email address.
 * @param {string} otp - One-time password.
 */
const sendOtpEmail = async (toEmail, otp) => {
  const mailOptions = {
    from: `"Support Team" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Your OTP Code',
    html: `
      <div style="font-family: Arial; padding: 20px;">
        <h2>Verification Code</h2>
        <p>Use the following OTP to verify your email:</p>
        <h1 style="color: #333;">${otp}</h1>
        <p>This code will expire in 10 minutes.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendOtpEmail };
