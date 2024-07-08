const express = require('express');
const router = express.Router();
const controller = require('../controllers/auditoriumsController');
const verifyRoles = require("../middleware/verifyRoles");
const verifyJWT = require("../middleware/verifyJWT");
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

router.put("/:name", verifyJWT, verifyRoles(1001), async (req, res) => {
  try {
    const name = req.params.name;
    const parts = req.body.parts;
    const response = await controller.putAuditorium(name, parts);
    res.status(201).json(response); // שימוש ב-json לשליחת התשובה עם סטטוס 201
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ message: error.message }); // שימוש ב-json לשליחת הודעת השגיאה עם סטטוס 500
    } else {
      console.error('Headers already sent, error:', error);
    }
  }
});
module.exports = router;
