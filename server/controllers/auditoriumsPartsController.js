const model = require('../models/auditoriumsPartsModel');
const { get } = require('../routes/auditoriumsPartsRoute');


// async function getEventById(id) {
//     try {
//         return model.get(id);
//     } catch (err) {
//         throw err;
//     }

// }
async function getAllAuditoriumParts(_auditoriumId){
    try {

        return model.getAllAuditoriumParts(_auditoriumId);
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


module.exports = { getAllAuditoriumParts}

