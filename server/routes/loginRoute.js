const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController')
const verifyJWT = require('../middleware/verifyJWT');
const verifyRoles = require('../middleware/verifyRoles');
// router.post("/", controller.handleLogin()); 
router.post("/",  async (req, res) => {
    //verifyJWT,verifyRoles("producer"),
// const userName = req.body.userName;
// const password = req.body.password;
//     const response = await controller.handleLogin(userName,password);
//     res.send(response);
});

module.exports = router;
