const express = require("express");
const router = express.Router();
const controller = require("../controllers/auditoriumsPartsController");
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
  const { auditoriumId } = req.query;
  const audtoriumsParts = await controller.getAllAuditoriumParts(auditoriumId);
  res.send(audtoriumsParts);
});

module.exports = router;
