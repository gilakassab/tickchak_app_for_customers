const model = require("../models/seatsTakenModel");
const audModel = require("../models/auditoriumsPartsModel");
const seatsModel = require("../models/seatsViewModel");
const _ = require("lodash");
const { error } = require("console");

async function putSeatsTaken(id, seatIds) {
  try {
    return model.putSeatsTaken(id, seatIds);
  } catch (err) {
    throw err;
  }
}

async function postSeatsTaken(eventId, auditoriumId) {
  try {
    const auditoriumParts = await audModel.getAuditoriumParts(auditoriumId);

    if (!Array.isArray(auditoriumParts) || auditoriumParts.length === 0) {
      throw new Error("Error: no parts found for the given auditoriumId");
    }

    const SEATS = [];

    await Promise.all(
      auditoriumParts.map(async (part) => {
        try {
          const seats = await seatsModel.getSeatsByPartId(part.partId);
          const seatIds = seats.map((seat) => seat.seatId);
          SEATS.push(seatIds);
        } catch (err) {
          console.error(`Failed to get seats for part ${part.partId}:`, err);
          SEATS.push([]);
        }
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
    console.error("Error updating seats taken:", err);
    throw err;
  }
}

module.exports = { putSeatsTaken, postSeatsTaken };
