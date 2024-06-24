const model = require('../models/UsersModel');
const { get } = require('../routes/usersRoute');


// async function getEventById(id) {
//     try {
//         return await model.getEventById(id);
//     } catch (err) {
//         throw err;
//     }
// }

// async function getAllEvents(category, _start, _limit) {
//     try {

//         return model.getAllEvents(category, _start, _limit);
//     } catch (err) {
//         throw err;
//     }
// }

// async function deleteEventById(id) {
//     try {
//         return model.deleteEvent(id);
//     } catch (err) {
//         throw err;
//     }

// }
async function postUser(userName,userPhone,userEmail) {
    try {
        ;
        return model.postUser(userName,userPhone,userEmail);
    } catch (err) {
        throw err;
    }
}

// async function postEvent() {

// try {
//     // const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

//     return model.postEvent();
// } catch (err) {
//     throw err;
// }

// }


module.exports = { postUser }
