const model = require("../models/eventsModel");
const pricesmodel = require("../models/ticketPricesModel");

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
    const allEvents = await model.getAllDatesEvents(auditoriumId, eventDate);

    const newEventDate = new Date(eventDate);

    const overlappingEvent = allEvents.find((event) => {
      const eventDate = new Date(event.eventDate);

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
    const overlapCheck = await checkEventOverlap(auditoriumId, eventDate);
    if (overlapCheck) {
      throw new Error("Event already exists on the same date");
    }

    return await model.putEvent(id);
  } catch (err) {
    throw err;
  }
}

async function postEvent(eventDetails) {
  try {
  
    const resultId= await model.postEvent(eventDetails);

    if(!resultId)
      {
        throw new Error("Failed to update event");
      }
    const ticketPriceId = await pricesmodel.postPrice(
      resultId,
      eventDetails.ticketPrice
    );
    return resultId;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getAllEvents,
  getNotAllowedEvents,
  getEventById,
  deleteEventById,
  putEvent,
  postEvent,
};
