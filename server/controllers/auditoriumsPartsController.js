const model = require("../models/auditoriumsPartsModel");

async function getAllAuditoriumParts(_auditoriumId) {
  try {
    return model.getAllAuditoriumParts(_auditoriumId);
  } catch (err) {
    throw err;
  }
}

module.exports = { getAllAuditoriumParts };
