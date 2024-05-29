const model = require('../model/usersModel');
// const bcrypt = require('bcrypt');
// const crypto = require('crypto');


// async function getUserById(id) {
//     try {
//         return model.getUser(id);
//     } catch (err) {
//         throw err;
//     }

// }
// async function getUserByIdWithPassword(userName,password) {
//     try {
//         const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
//         const userPassword =  model.getUserWithPassword(userName);
      
//         if (user && userPassword === hashedPassword) {
//             return user; // סיסמה תואמת
//         } else {
//             return null; // סיסמה לא תואמת או משתמש לא קיים
//         }
//     } catch (err) {
//         throw err;
//     }

// }
// async function checkIfUserExistsByUsername(userName) {
//     try {
//         return model.checkByUsername(userName);
//     } catch (err) {
//         throw err;
//     }

// }
// async function getAllUsers() {
//     try {
//         return model.getAllUsers();
//     } catch (err) {
//         throw err;
//     }
// }
// async function deleteUserById(id) {
//     try {
//         return model.deleteUser(id);
//     } catch (err) {
//         throw err;
//     }

// }
// async function putUserController(id,name,username,email,street, city,phone) {
//     try {
//         return model.putUser(id,name,username,email,street, city,phone);
//     } catch (err) {
//         throw err;
//     }
// }

// async function postUserController(name, username,email,street,city,phone,password) {

// try {
//     const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
   
//     return model.postUser(name, username, email, street, city, phone, hashedPassword);
// } catch (err) {
//     throw err;
// }

// }


// module.exports = { getUserById,getAllUsers,getUserByIdWithPassword,checkIfUserExistsByUsername ,deleteUserById,putUserController,postUserController}
