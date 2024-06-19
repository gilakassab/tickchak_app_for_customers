const model = require('../models/eventsModel');
const { get } = require('../routes/eventsRoute');


async function getEventById(id) {
    try {
        return await model.getEventById(id);
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
// async function putEvent() {
//     try {
//         return model.postEvent();
//     } catch (err) {
//         throw err;
//     }
// }

// async function postEvent() {

// try {
//     // const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

//     return model.postEvent();
// } catch (err) {
//     throw err;
// }

// }


module.exports = { getAllEvents, getEventById, deleteEventById }
