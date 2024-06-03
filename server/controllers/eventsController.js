const model = require('../models/eventsModel');
const { get } = require('../routes/eventsRoute');


async function getEventById(id) {
    try {
        return model.getEventById(id);
    } catch (err) {
        throw err;
    }

}
async function getAllEvents(category, _start, _limit) {
    try {

        return model.getAllEvents(category, _start, _limit);
    } catch (err) {
        throw err;
    }
}
async function deleteEventById(id) {
    try {
        return model.deleteEvent(id);
    } catch (err) {
        throw err;
    }

}
// async function putUser(id,name,username,email,street, city,phone) {
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


module.exports = { getAllEvents, getEventById, deleteEventById }
