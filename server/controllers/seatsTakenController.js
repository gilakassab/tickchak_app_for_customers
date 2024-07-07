const model = require("../models/seatsTakenModel");
const audModel = require("../models/auditoriumsPartsModel");
const seatsModel = require("../models/seatsViewModel");
const _ = require("lodash");
const { error } = require("console");

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
async function putSeatsTaken(id, seatIds) {
  try {
    console.log("eventid - ", id);
    console.log("seatIds - ", seatIds);
    return model.putSeatsTaken(id, seatIds);
  } catch (err) {
    throw err;
  }
}

async function postSeatsTaken(eventId, auditoriumId) {
  try {
    const auditoriumParts = await audModel.getAuditoriumParts(auditoriumId);
   
    if (!auditoriumParts) {
      throw new Error("error: auditorium isn't updated in the db");
    }
    const SEATS = [];

    await Promise.all(
      auditoriumParts.map(async (part) => {
        const seats = await seatsModel.getSeatsByPartId(part);
        let seatIds;
        if (_.isEmpty(seats)) {
          seatIds = []; // אם המושבים ריקים, החזר מערך ריק
        } else {
          seatIds = seats.map((seat) => seat.seatId);
        }
        SEATS.push(seatIds);
      })
    );
   
    await Promise.all(
      SEATS.map((seatsInPart) => {
        if (_.isEmpty(seatsInPart)) {
          return Promise.resolve();
        }
        return model.postSeatsTaken(eventId, seatsInPart);
      })
    );
  } catch (err) {
    throw err;
  }
}

module.exports = { putSeatsTaken, postSeatsTaken };
