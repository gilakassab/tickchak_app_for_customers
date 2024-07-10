const model = require('../models/auditoriumsModel');
const audPartModel = require('../models/auditoriumsPartsModel');
const seatsModel = require('../models/seatsViewModel');

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
async function putAuditorium(name, parts) {
  try {
    const affectedRows = await model.putAuditorium(name);
    if (affectedRows === 0) {
      throw new Error("error: auditorium isn't updated in the db");
    }
    const auditoriumId = await model.getAuditoriumById(name);
   
    if (!auditoriumId.auditoriumId) {
      throw new Error("auditorium doesn't exist");
    }

    const partInsertIds = [];

    for (const part of parts) {
      
      const partInsertId = await audPartModel.postAuditoriumParts(auditoriumId.auditoriumId, part.title);
      if (!partInsertId) {
        throw new Error("could not update parts");
      }
      partInsertIds.push(partInsertId);

      for (let rowIndex = 0; rowIndex < part.matrix.length; rowIndex++) {
        let countIndex=1;
        for (let colIndex = 0; colIndex < part.matrix[rowIndex].length; colIndex++) {
          const seatIsVisible = part.matrix[rowIndex][colIndex];
          if(seatIsVisible){
            await seatsModel.postSeatsView(rowIndex, countIndex, partInsertId, seatIsVisible);
            countIndex++;
          }
          else {
            await seatsModel.postSeatsView(rowIndex, 0, partInsertId, seatIsVisible);
          }
         
        }
      }
    }

    return { success: true, auditoriumId, partInsertIds };

  } catch (err) {
    console.error(err);
    throw err;
  }
}
module.exports = { getAllAuditoriums, addAuditorium,putAuditorium };
