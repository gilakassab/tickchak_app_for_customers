const express = require('express');
const router = express.Router();
const controller = require('../controllers/auditoriumsController');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
    const { exists } = req.query;
    const auditoriumExists = exists === 'true';
    try {
      const auditoriums = await controller.getAllAuditoriums(auditoriumExists);
      console.log(auditoriums)
      res.status(200).send(auditoriums);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
});

router.post("/", async (req, res) => {
    const { auditoriumName } = req.body;
    try {
      const newAuditorium = await controller.addAuditorium(auditoriumName);
      res.status(201).send(newAuditorium);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
});

  router.put("/:auditoriumName", async(req, res) => {
    const auditoriumName = req.params.name;
    console.log(auditoriumName);
     const parts=req.body.parts;
     const response=await controller.putAuditorium(auditoriumName,parts)
     res.send(response);
});

module.exports = router;
