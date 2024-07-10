const { json } = require("express");
const pool = require("../DB.js");

async function getAuditoriumParts(auditoriumId) {
  try {
    const sql = "SELECT partId FROM auditoriumsParts where auditoriumId=?";
    const result = await pool.query(sql, [auditoriumId]);
    return result[0];
  } catch (err) {
    console.log(err);
  }
}

async function getAllAuditoriumParts(_auditoriumId) {
  try {
    const sql = "SELECT * FROM auditoriumsParts where auditoriumId=?";
    const result = await pool.query(sql, [_auditoriumId]);

    return result[0];
  } catch (err) {
    console.log(err);
  }
}

async function postAuditoriumParts(auditoriumId, partName) {
  try {
    const sql1 = `INSERT INTO auditoriumsParts (auditoriumId, partName, coords) VALUES (?, ?, ?)`;
    const partInsertId = await pool.query(sql1, [auditoriumId, partName, ""]);
    return partInsertId[0].insertId;
  } catch (err) {
    console.error("Error updating user:", err);
    throw err;
  }
}

module.exports = {
  getAllAuditoriumParts,
  getAuditoriumParts,
  postAuditoriumParts,
};
