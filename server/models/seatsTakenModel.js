const { json } = require("express");
const pool = require("../DB.js");

async function putSeatsTaken(id, seatIds) {
  try {
    const sql = `UPDATE seatsTaken SET seatIsTaken = true WHERE eventId = ? AND seatId IN (?)`;
    const result = await pool.query(sql, [id, seatIds]);
    return result[0];
  } catch (err) {
    console.error("Error updating user:", err);
    throw err;
  }
}

async function postSeatsTaken(eventId, seatIds) {
  try {
    const sql = `INSERT INTO seatsTaken (eventId, seatId, seatIsTaken) VALUES ( ? , ? , false)`;
    const seatsResult = await Promise.all(
      seatIds.map((seatId) => pool.query(sql, [eventId, seatId]))
    );
    return { seatIds };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = { putSeatsTaken, postSeatsTaken };
