const { json } = require('express');
const pool = require('../DB.js');

// async function getUser(id) {
//     try {

//       const sql = 'SELECT * FROM users natural join address where id=?';
//       const result = await pool.query(sql, [id]);
//       if( !result[0][0])
//          {
         
//           return res.status(200).json({});
//          }
//      return result[0][0];
  
//     } catch (err) {
//       console.log(err);
//     }
// }
// async function getAllSeats(id, partId) {
//   try {
//     console.log("MODEL : eventid" + id + "partId"+ partId);
//    const sql = `SELECT * FROM seatsView NATURAL JOIN seatsTaken where partId=? and eventId=?`;   
//     const result = await pool.query(sql, [partId,id]);
//     console.log(result[0]);
//     return result[0];
//   } catch (err) {
//     console.log(err);
//   }
// }
// async function checkByUsername(userName) {
//   try {
//     const sql = 'SELECT * FROM users WHERE users.username = ?;';
//     const result = await pool.query(sql, [userName]);
//     console.log(result)
//     return result[0][0];
//   } catch (err) {
//     console.log(err);
//   }
// }
// async function getAllUsers() {
//   try {
//     const sql = 'SELECT * FROM users NATURAL JOIN address';
//     const result = await pool.query(sql);
//     return result[0];
//   } catch (err) {
//     console.log(err);
//   }
// }
// async function deleteUser(id) {
//   try {
//     const sql3 = 'DELETE FROM passwords WHERE user_id=?';
//     await pool.query(sql3, [id]);
//     const sql2 = 'DELETE FROM address WHERE id=?';
//     await pool.query(sql2, [id]);
//     const sql1 = 'DELETE FROM users WHERE id=?';
//     await pool.query(sql1, [id]);
//   } catch (err) {
//     console.log(err);
//     throw err; 
//   }
// }


async function putSeatsTaken(id, seatIds) {
    try {
      const sql = `UPDATE seatsTaken SET seatIsTaken = true WHERE eventId = ? AND seatId IN (?)`;
      const result = await pool.query(sql, [id, seatIds]);
      console.log(`Updated seatIsTaken to true for eventId ${id} and seatId (${(seatIds)}) `);
      return result[0];
    } catch (err) {
      console.error("Error updating user:", err);
      throw err; 
    }
  }
  
// async function postUser(name, username, email, phone, street, city,password) {
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

module.exports = {putSeatsTaken}
