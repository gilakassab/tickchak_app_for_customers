const { json } = require('express');
const pool = require('../DB.js');

async function deletePriceByEventId(id) {
    try {
      const sql1 = "DELETE FROM ticketPrices WHERE eventId=?";
      await pool.query(sql1, [id]);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  module.exports = {deletePriceByEventId}

