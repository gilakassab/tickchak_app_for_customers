const express = require('express');
const router = express.Router();
const verifyRoles = require("../middleware/verifyRoles");
const verifyJWT = require("../middleware/verifyJWT");

router.post('/',verifyJWT, verifyRoles(1001,2001), (req, res) => {
    res.clearCookie('accessToken', { httpOnly: true, sameSite: 'None', secure: true });
    return res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;