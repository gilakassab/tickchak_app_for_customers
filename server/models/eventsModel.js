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



async function getAllEvents(category, _start, _limit) {
  try {
    let result;

    if (category === 'allEvents') {
      const sql = `SELECT * FROM events NATURAL JOIN auditoriums LIMIT ${_start}, ${_limit}`;
      result = await pool.query(sql);
    } else {
      const sql = `SELECT * FROM events NATURAL JOIN auditoriums WHERE events.eventCategory='${category}' LIMIT ${_start}, ${_limit}`;
      result = await pool.query(sql);
    }
   
    return result[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
}


async function deleteEventById(id) {
  // try {
  //   // const sql3 = 'DELETE FROM passwords WHERE user_id=?';
  //   // await pool.query(sql3, [id]);
  //   // const sql2 = 'DELETE FROM address WHERE id=?';
  //   // await pool.query(sql2, [id]);
  //   const sql1 = 'DELETE FROM events WHERE id=?';
  //   await pool.query(sql1, [id]);
  // } catch (err) {
  //   console.log(err);
  //   throw err;
  // }
}


// async function putEvent(id, name, username, email, street, city, phone, password) {
//   try {
//     const sql1 = `UPDATE users SET name = ?, username = ?, email = ?, phone = ? WHERE id = ?`;
//     await pool.query(sql1, [name, username, email, phone, id]);
//     const sql2 = `UPDATE address SET street = ?, city = ? WHERE id = ?`;
//     await pool.query(sql2, [street, city, id]);
//     // const sql3 = `UPDATE passwords SET password = ? WHERE user_id = ?`;
//     // await pool.query(sql3, [password, id]);
//   } catch (err) {
//     console.error("Error updating user:", err);
//     throw err; 
//   }
// }

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


module.exports = { getAllEvents, getEventById, deleteEventById }
