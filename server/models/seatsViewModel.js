const { json } = require("express");
const pool = require("../DB.js");

async function getAllSeats(id, partId) {
  try {
    const sql = `SELECT * FROM seatsView NATURAL JOIN seatsTaken where partId=? and eventId=?`;
    const result = await pool.query(sql, [partId, id]);
    return result[0];
  } catch (err) {
    console.log(err);
  }
}
async function getSeatsByPartId(partId) {
  try {
    const sql = `SELECT seatId FROM seatsView where partId=?`;
    const result = await pool.query(sql, [partId]);

    return result[0];
  } catch (err) {
    console.log(err);
  }
}

async function postSeatsView(rowIndex, colIndex, partInsertId, seatIsVisible) {
  try {
    const sql1 =
      "INSERT INTO seatsView (rowNumber, seatNumber, partId, seatIsVisible) VALUES (?, ?, ?, ?)";
    const result = await pool.query(sql1, [
      rowIndex,
      colIndex,
      partInsertId,
      seatIsVisible,
    ]);

    return result[0].insertId;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = { getAllSeats, getSeatsByPartId, postSeatsView };
