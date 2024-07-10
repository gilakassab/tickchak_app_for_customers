const { json } = require("express");
const pool = require("../DB");

async function getEventById(id) {
  try {
    const sql = `
      SELECT events.*, auditoriums.auditoriumName ,ticketPrices.ticketPrice
      FROM events 
      NATURAL JOIN ticketPrices
      JOIN auditoriums ON events.auditoriumId = auditoriums.auditoriumId 
      WHERE events.eventId = ?;
    `;
    const [result] = await pool.query(sql, [id]);
    console.log(result[0]);
    return result[0]; // Assuming result is an array and we need the first element
  } catch (err) {
    console.error(err);
    throw err;
  }
}
async function getAllDatesEvents(auditoriumId, eventDate) {
  try {
    let result;
    const sql =
      "SELECT * FROM events WHERE events.eventIsAllowed = TRUE and auditoriumId = ?";

    result = await pool.query(sql, [auditoriumId, eventDate]);
    return result[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getNotAllowedEvents() {
  try {
    console.log("hi2");
    const sql =
      "SELECT * FROM events NATURAL JOIN auditoriums JOIN users ON events.eventProducer = users.userId WHERE events.eventIsAllowed = FALSE";
    const result = await pool.query(sql);
    console.log(result[0]);
    return result[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getAllEvents(category, _start, _limit) {
  try {
    let result;

    if (category === "allEvents") {
      const sql = `SELECT * FROM events NATURAL JOIN auditoriums NATURAL JOIN ticketPrices WHERE events.eventIsAllowed = TRUE LIMIT ${_start}, ${_limit}`;
      result = await pool.query(sql);
    } else {
      const sql = `SELECT * FROM events NATURAL JOIN auditoriums NATURAL JOIN ticketPrices WHERE events.eventIsAllowed = TRUE and events.eventCategory='${category}' LIMIT ${_start}, ${_limit}`;
      result = await pool.query(sql);
    }
    return result[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function deleteEventById(id) {
  try {
    const sql1 = "DELETE FROM events WHERE eventId=?";
    await pool.query(sql1, [id]);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function putEvent(id) {
  const sql = `UPDATE events SET eventIsAllowed = TRUE WHERE eventId = ?`;
  return pool
    .query(sql, [id])
    .then((result) => {
      return id;
    })
    .catch((err) => {
      console.error("Error updating user:", err);
      throw err;
    });
}

const formatDateForMySQL = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

async function postEvent(eventDetails) {
  try {
    console.log("1", eventDetails.auditoriumName);
    const {
      eventName,
      eventDate,
      eventOpenGates,
      eventBeginAt,
      eventEndAt,
      eventProducer,
      eventRemarks,
      auditoriumName,
      eventPicUrl,
      eventCategory,
      eventIsAllowed,
    } = eventDetails;

    const formattedEventDate = formatDateForMySQL(eventDate);
    console.log("1", auditoriumName);

    // const auditoriumQuery =
    //   "SELECT * FROM auditoriums WHERE auditoriumName = ? and auditoriumExists=false";
    // const auditoriumResult = await pool.query(auditoriumQuery, [
    //   auditoriumName,
    // ]);
    // console.log(auditoriumResult[0]);

    // if (!auditoriumResult) {
    //   return { error: "Auditorium not found" };
    // }
    // const auditoriumId = auditoriumResult[0].auditoriumId;

    const sql = `
      INSERT INTO events (eventName, eventDate, eventOpenGates, eventBeginAt, eventEndAt, 
      eventProducer, eventRemarks, auditoriumId, eventPicUrl, eventCategory, eventIsAllowed) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const result = await pool.query(sql, [
      eventName,
      formattedEventDate,
      eventOpenGates,
      eventBeginAt,
      eventEndAt,
      eventProducer,
      eventRemarks,
      auditoriumName,
      eventPicUrl,
      eventCategory,
      eventIsAllowed,
    ]);

    return result[0].insertId;
  } catch (err) {
    console.error(err);
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
  getAllDatesEvents,
};
