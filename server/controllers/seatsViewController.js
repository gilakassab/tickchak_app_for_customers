const model = require('../models/seatsViewModel');
const { get } = require('../routes/seatsViewRoute');


// async function getEventById(id) {
//     try {
//         return model.getEventById(id);
//     } catch (err) {
//         throw err;
//     }

// }
async function getAllSeats( id,partId) {
    try {
        console.log("CONTOLLER : eventid" + id + "partId"+ partId);
        return model.getAllSeats( id,partId);
    } catch (err) {
        throw err;
    }
}

// async function deleteEventById(id) {
//     try {
//         return model.deleteEvent(id);
//     } catch (err) {
//         throw err;
//     }

// }
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


module.exports = { getAllSeats }
