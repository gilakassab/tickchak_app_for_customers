const model = require('../models/eventsModel');
const pricesmodel = require('../models/ticketPricesModel');



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
        await pricesmodel.deletePriceByEventId(id);
        return model.deleteEventById(id);
    } catch (err) {
        throw err;
    }

}


async function checkEventOverlap(auditoriumId, eventDate) {
    try {
        // Retrieve all events from the model for the given auditorium and date
        const allEvents = await model.getAllDatesEvents(auditoriumId, eventDate);

        // Convert eventDate to Date object for date comparison
        const newEventDate = new Date(eventDate);

        // Check for overlap
        const overlappingEvent = allEvents.find(event => {
            const eventDate = new Date(event.eventDate);

            // Check for date match
            return eventDate.getTime() === newEventDate.getTime();
        });

        return !!overlappingEvent; // Convert to boolean
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function putEvent(id, eventDate, auditoriumId) {
    try {
        // Check for overlap with existing events based on date only
        const overlapCheck = await checkEventOverlap(auditoriumId, eventDate);
        if (overlapCheck) {
            throw new Error("Event already exists on the same date");
        }

        // If no overlap, update the event
        return await model.putEvent(id);
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