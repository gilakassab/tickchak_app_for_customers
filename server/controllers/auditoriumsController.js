const model = require('../models/auditoriumsModel');

async function getAllAuditoriums(auditoriumExists) {
    try {
      return await model.getAllAuditoriums(auditoriumExists);
    } catch (err) {
      console.error(err);
      throw err;
    }
}

async function addAuditorium(auditoriumName) {
    try {
      return await model.addAuditorium(auditoriumName);
    } catch (err) {
      console.error(err);
      throw err;
    }
}

module.exports = { getAllAuditoriums, addAuditorium };
