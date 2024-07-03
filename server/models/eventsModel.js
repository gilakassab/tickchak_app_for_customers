const { json } = require('express');
const pool = require('../DB');

async function getEventById(id) {
  try {
    const sql = `
      SELECT events.*, auditoriums.auditoriumName 
      FROM events 
      JOIN auditoriums ON events.auditoriumId = auditoriums.auditoriumId 
      WHERE events.eventId = ?;
    `;
    const [result] = await pool.query(sql, [id]);
    return result[0];  // Assuming result is an array and we need the first element
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getNotAllowedEvents() {
  try {
    let result;
    const sql = '  SELECT * FROM events NATURAL JOIN auditoriums JOIN users ON events.eventProducer = users.userId WHERE events.eventIsAllowed = FALSE;';
    result = await pool.query(sql);
    return result[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
}


async function getAllEvents(category, _start, _limit) {
  try {
    let result;

    if (category === 'allEvents') {
      const sql = `SELECT * FROM events NATURAL JOIN auditoriums WHERE events.eventIsAllowed = TRUE LIMIT ${_start}, ${_limit}`;
      result = await pool.query(sql);
    } else {
      const sql = `SELECT * FROM events NATURAL JOIN auditoriums WHERE events.eventIsAllowed = TRUE and events.eventCategory='${category}' LIMIT ${_start}, ${_limit}`;
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
    const sql1 = 'DELETE FROM events WHERE eventId=?';
    await pool.query(sql1, [id]);
  } catch (err) {
    console.log(err);
    throw err;
  }
}


async function putEvent(id) {
  try {
    const sql = `UPDATE events SET eventIsAllowed = TRUE WHERE eventId = ?`;
    const result = await pool.query(sql, [id]);
    return result[0].insertId;
  } catch (err) {
    console.error("Error updating user:", err);
    throw err;
  }
}


const formatDateForMySQL = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

async function postEvent(eventDetails) {
  try {
    const {
      eventName, eventDate, eventOpenGates, eventBeginAt, eventEndAt,
      eventProducer, eventRemarks, auditoriumName, eventPicUrl, eventCategory, eventIsAllowed
    } = eventDetails;

    // Format the eventDate to MySQL compatible format
    const formattedEventDate = formatDateForMySQL(eventDate);

    // Find the auditoriumId based on auditoriumName
    const auditoriumQuery = 'SELECT auditoriumId FROM auditoriums WHERE auditoriumName = ?';
    const [auditoriumResult] = await pool.query(auditoriumQuery, [auditoriumName]);
    const auditoriumId = auditoriumResult.length > 0 ? auditoriumResult[0].auditoriumId : null;

    if (!auditoriumId) {
      throw new Error('Invalid auditorium name');
    }

    // Insert the event into the database
    const sql = `
      INSERT INTO events (eventName, eventDate, eventOpenGates, eventBeginAt, eventEndAt, 
      eventProducer, eventRemarks, auditoriumId, eventPicUrl, eventCategory, eventIsAllowed) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const result = await pool.query(sql, [
      eventName, formattedEventDate, eventOpenGates, eventBeginAt, eventEndAt,
      eventProducer, eventRemarks, auditoriumId, eventPicUrl, eventCategory, eventIsAllowed
    ]);

    return result[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = { getAllEvents, getNotAllowedEvents, getEventById, deleteEventById, putEvent, postEvent };

