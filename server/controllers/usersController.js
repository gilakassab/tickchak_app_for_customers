const model = require('../models/usersModel');
const crypto = require('crypto');

async function postUser(userName,userPhone,userEmail) {
    try {
        ;
        return model.postUser(userName,userPhone,userEmail);
    } catch (err) {
        throw err;ג
    }
}
async function postUserWithPwd(userName,password, userPhone,userEmail) {
    try {
        console.log("im here")
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
       
        return model.postUserWithPwd(userName,hashedPassword ,userPhone,userEmail,2001);
    } catch (err) {
        throw err;
    }
}

module.exports = { postUser,postUserWithPwd }
