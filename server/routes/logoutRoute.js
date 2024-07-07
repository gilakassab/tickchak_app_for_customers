const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    console.log("11")
    res.clearCookie('accessToken', { httpOnly: true, sameSite: 'None', secure: true });
    return res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;