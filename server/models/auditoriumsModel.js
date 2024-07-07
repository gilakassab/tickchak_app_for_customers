const { json } = require('express');
const pool = require('../DB.js');

async function getAllAuditoriums(auditoriumExists) {
  try {
    const sql = 'SELECT auditoriumId, auditoriumName, auditoriumExists FROM auditoriums WHERE auditoriumExists = ?';
    const result = await pool.query(sql, [auditoriumExists]);
    console.log(result[0])
    return result[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
}
async function addAuditorium(auditoriumName) {
  try {
    const sql = 'INSERT INTO auditoriums (auditoriumName, auditoriumExists) VALUES (?, ?)';
    const result = await pool.query(sql, [auditoriumName, false]);
    return { auditoriumId: result[0].insertId, auditoriumName, auditoriumExists: false };
  } catch (err) {
    console.error(err);
    throw err;
  }
}





module.exports = {getAllAuditoriums,addAuditorium}
