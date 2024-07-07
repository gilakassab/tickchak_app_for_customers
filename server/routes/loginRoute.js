const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');
// const verifyJWT = require('../middleware/verifyJWT');
// const verifyRoles = require('../middleware/verifyRoles');

router.post("/", async (req, res) => {
        console.log(req.body);
        const userEmail = req.body.userEmail;
        const password = req.body.password;
        
        const loginResponse = await controller.handleLogin(userEmail, password);
    console.log(loginResponse);

    if (loginResponse) {
        const { accessToken, user } = loginResponse;
        res.cookie('accessToken', accessToken, { 
            httpOnly: true, 
            sameSite: 'None', 
            secure: true, 
            maxAge: 24 * 60 * 60 * 1000 
        });
        return res.json({ accessToken, user });
    }
 else {
    return res.status(401).json({ message: 'Unauthorized' });
}
   
    
});

module.exports = router;
