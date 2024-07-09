const model = require('../models/seatsViewModel');


async function getAllSeats( id,partId) {
    try {
        return model.getAllSeats( id,partId);
    } catch (err) {
        throw err;
    }
}


module.exports = { getAllSeats }
