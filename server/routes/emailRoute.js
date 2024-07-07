const express = require("express");
const router = express.Router();
const { sendMail } = require("../services/sendEmailService");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/", async (req, res) => {
  
  const email=req.body.email;
  const subject=req.body.subject;
  const text = req.body.text;
  console.log(email, subject, text)
  if (!email || !subject || !text) {
    return res
      .status(400)
      .json({ success: false, message: "Necessary details to send the email are missing" });
  }
  try {
    
    await sendMail(email, subject, text);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error sending email" });
  }
});

module.exports = router;