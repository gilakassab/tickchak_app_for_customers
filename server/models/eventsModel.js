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
async function getAllDatesEvents(auditoriumId,eventDate) {
  try {
    let result;
      const sql = '  SELECT * FROM events WHERE events.eventIsAllowed = TRUE and auditoriumId = ? AND eventDate = ?;';
      result = await pool.query(sql,[auditoriumId , eventDate]);
    return result[0];
  } catch (err) {
    console.log(err);
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

    console.log("id",id);
    const sql = `UPDATE events SET eventIsAllowed = TRUE WHERE eventId = ?`;
    return pool.query(sql, [id])
    .then(result => {
      return id;
    })
    .catch(err => {
      console.error("Error updating user:", err);
      throw err;
    });

}

// async function postEvent(name, username, email, phone, street, city,password) {
//   try {
//     const sql1 = 'INSERT INTO users (name, username, email, phone) VALUES (?, ?, ?, ?)';
//     const userResult = await pool.query(sql1, [name, username, email, phone]);
//     const userId = userResult[0].insertId;
//     const sql2 = 'INSERT INTO address (id, street, city) VALUES (?, ?, ?)';
//     await pool.query(sql2, [userId, street, city]);
//     const sql3 = 'INSERT INTO passwords (user_id,password) VALUES (?, ?)';
//     await pool.query(sql3, [userId,password]);
//     return { userId }; 
//   } catch (err) {
//     console.log(err);
//     throw err; 
//   }
// }


module.exports = { getAllEvents,getNotAllowedEvents, getEventById, deleteEventById,putEvent,getAllDatesEvents }
