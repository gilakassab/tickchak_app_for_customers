const model = require('../models/auditoriumsModel');



async function getAllAuditoriums(auditoriumExists) {
    try {
      return await model.getAllAuditoriums(auditoriumExists);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  


module.exports = {getAllAuditoriums}
