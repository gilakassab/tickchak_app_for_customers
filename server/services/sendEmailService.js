const nodemailer = require("nodemailer");
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = async (email, subject, text) => {
  console.log(email, subject, text)
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    text: text,
  };
  console.log(mailOptions)

  try {
    
    const info = await transporter.sendMail(mailOptions);
     //console.log("Email sent: " + info.response);
  } catch (error) {
console.log(error)  }
};

module.exports = { sendMail };