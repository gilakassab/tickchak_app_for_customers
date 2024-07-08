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
   
    if (!auditoriumParts || auditoriumParts.length === 0) {
      throw new Error("error: no parts found for the given auditoriumId");
    }

    const SEATS = [];

    // מעדכן את SEATS בצורה אסינכרונית
    await Promise.all(
      auditoriumParts.map(async (part) => {
        try {
          const seats = await seatsModel.getSeatsByPartId(part);
          let seatIds;
          if (_.isEmpty(seats)) {
            seatIds = []; // אם המושבים ריקים, החזר מערך ריק
          } else {
            seatIds = seats.map((seat) => seat.seatId);
          }
          SEATS.push(seatIds);
        } catch (err) {
          console.error(`Failed to get seats for part ${part}:`, err);
          SEATS.push([]); // במקרה של שגיאה, הוסף מערך ריק
        }
      })
    );

    // מעדכן את המושבים באירוע בצורה אסינכרונית
    await Promise.all(
      SEATS.map((seatsInPart) => {
        if (_.isEmpty(seatsInPart)) {
          return Promise.resolve();
        }
        return model.postSeatsTaken(eventId, seatsInPart);
      })
    );
    
    console.log('Seats taken successfully updated.');
    
  } catch (err) {
    console.error('Error updating seats taken:', err);
    throw err; // ניתן לזרוק מחדש את השגיאה כדי שהיא תטופל במקום הקורא
  }
}



module.exports = { putSeatsTaken, postSeatsTaken };
