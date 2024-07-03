const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');
const verifyJWT = require('../middleware/verifyJWT');
const verifyRoles = require('../middleware/verifyRoles');

router.post("/", async (req, res) => {
   
        const userName = req.body.userName;
        const password = req.body.password;
        const accessToken = await controller.handleLogin(userName, password);
    
        if (accessToken) {
            res.cookie('accessToken', accessToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
            return res.json({ accessToken });

    }
 else {
    return res.status(401).json({ message: 'Unauthorized' });
}
   
    
});

module.exports = router;
