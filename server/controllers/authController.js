const model = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogin = async (userName,password) => {
    console.log("123")
    if (!userName || !password) return res.status(400).json({ 'message': 'Username and password are required.' });
    const foundUser = model.postUserLogin(userName,password);
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
   
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        // create JWTs
        const role = foundUser.roleId;
        const accessToken = jwt.sign(
            { "userInfo": {
                userName:foundUser.username,
                userRole: role
            } },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
      
        // const currentUser = { ...foundUser, accessToken };
        // usersDB.setUsers([...otherUsers, currentUser]);
        // await fsPromises.writeFile(
        //     path.join(__dirname, '..', 'model', 'users.json'),
        //     JSON.stringify(usersDB.users)
        // );
        res.cookie('jwt', accessToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };