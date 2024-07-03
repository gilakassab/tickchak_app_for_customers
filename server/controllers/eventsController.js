const model = require('../models/eventsModel');



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
async function getNotAllowedEvents() {
    try {

        return model.getNotAllowedEvents();
    } catch (err) {
        throw err;
    }
}

async function deleteEventById(id) {
    try {
        return model.deleteEventById(id);
    } catch (err) {
        throw err;
    }

}
async function putEvent(id, eventIsAllowed) {
    try {
        return model.putEvent(id, eventIsAllowed);
    } catch (err) {
        throw err;
    }
}

async function postEvent(eventDetails) {
    try {
        return await model.postEvent(eventDetails);
    } catch (err) {
        throw err;
    }
}


module.exports = { getAllEvents, getNotAllowedEvents, getEventById, deleteEventById, putEvent, postEvent }
