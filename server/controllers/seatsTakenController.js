const model = require('../models/seatsTakenModel');
const { get } = require('../routes/seatsTakenRoute');


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
async function putSeatsTaken(id,seatIds) {
    try {
        console.log("eventid - ",id);
        console.log("seatIds - ",seatIds);
        return model.putSeatsTaken(id,seatIds);
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


module.exports = { putSeatsTaken }
