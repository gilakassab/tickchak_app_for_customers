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


    async function checkEventOverlap(auditoriumId, eventDate, eventEndAt, eventOpenGates) {
        try {
          // Retrieve all events from the model for the given auditorium and date
          const allEvents = await model.getAllDatesEvents(auditoriumId, eventDate);
      
          // Convert eventEndAt and eventOpenGates to Date objects for comparison
          const newEventStart = new Date(eventOpenGates);
          const newEventEnd = new Date(eventEndAt);
      
          // Convert eventDate to Date object for date comparison
          const newEventDate = new Date(eventDate);
      
          // Check for overlap
          const overlappingEvent = allEvents.find(event => {
            const eventStart = new Date(event.eventOpenGates);
            const eventEnd = new Date(event.eventEndAt);
            const eventDate = new Date(event.eventDate);
      
            // Check for both time overlap and date match
            return (newEventStart < eventEnd && newEventEnd > eventStart && eventDate.getTime() === newEventDate.getTime());
          });
      
          if (overlappingEvent) {
            return { overlap: true, overlappingEvent };
          } else {
            return { overlap: false };
          }
        } catch (err) {
          console.error(err);
          throw err;
        }
      }
      

async function putEvent(id,eventDate,eventEndAt,eventOpenGates,auditoriumId) {
    try {
        const overlapCheck = await checkEventOverlap(auditoriumId,eventDate,eventEndAt, eventOpenGates);
    if (overlapCheck.overlap) {

        return model.deleteEventById(id)
    }
        return model.putEvent(id);
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
