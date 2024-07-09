const model = require('../models/usersModel');
const crypto = require('crypto');
const _ = require("lodash");

async function getProducerNameById(id) {
    try {
        const userName = await model.getUser(id);
        return userName; 
    } catch (err) {
        console.error("Error fetching producer name:", err);
        throw err;
    }
}

async function postUser(userName,userPhone,userEmail) {
    try {
        return model.postUser(userName,userPhone,userEmail,3001);
    } catch (err) {
        throw err;
    }
}
async function postUserWithPwd(userName,password, userPhone,userEmail) {
    try {
        const emailExists = await model.checkEmailExists(userEmail);
        if (!_.isEmpty(emailExists)) {
            const error = new Error('Email already exists');
            error.status = 403;
            throw error;
        }
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
        return model.postUserWithPwd(userName, hashedPassword, userPhone, userEmail, 2001);
    } catch (err) {
        throw err;
    }
}

module.exports = { postUser,postUserWithPwd,getProducerNameById }
