const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: "hiriyachauhan123@gmail.com",
    pass: "yqnwsioyqrqeqdiw",
  },
});

// Wrap in an async IIFE so we can use await.
async function sendMail (to, subject, text, html) {

  const info = await transporter.sendMail({
    from: '"CodeConnect" <hiriyachauhan123@gmail.com>',
    to,
    subject,
    text, // plain‑text body
    html, // HTML body
  });

  console.log("Message sent:", info.messageId);
}

module.exports = sendMail;