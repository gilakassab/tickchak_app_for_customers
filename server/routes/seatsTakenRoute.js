const express = require("express");
const router = express.Router();
const controller = require("../controllers/seatsTakenController");
const verifyRoles = require("../middleware/verifyRoles");
const verifyJWT = require("../middleware/verifyJWT");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.put("/", async (req, res) => {
  try {
    const id = req.body.eventId;
    const seatIds = req.body.seatIds;
    const seats = await controller.putSeatsTaken(id, seatIds);
    res.status(200).send(seats);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.delete("/:id", verifyJWT, verifyRoles(1001), async (req, res) => {
  const id = req.params.id;
  const event = await controller.deleteEventById(id);
  res.send(event);
});

router.post("/", verifyJWT, verifyRoles(1001), async (req, res) => {
  try {

    const eventId = req.query.eventId;
    const auditoriumId = req.body.auditoriumId;
   
    await controller.postSeatsTaken(eventId, auditoriumId);
    res.status(200).send();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
