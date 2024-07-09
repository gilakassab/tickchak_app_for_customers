const express = require("express");
const router = express.Router();
const controller = require("../controllers/usersController");


router.post("/", async (req, res) => {
  try {
    
    const userName = req.body.userName;
    const password = req.body.password;
    const userPhone = req.body.userPhone;
    const userEmail = req.body.userEmail;

    const response = await controller.postUserWithPwd(
      userName,
      password,
      userPhone,
      userEmail
    );
    res.sendStatus(200).send(response);
  } catch (err) {
    if (err.status) {
      res.status(err.status).send({ message: err.message });
    } else {
      res.status(500).send({ message: err.message });
    }
  }
});

module.exports = router;
