const express = require("express");
const multer = require("multer");
const router = express.Router();
const controller = require("../controllers/eventsController");
const controllerSeats = require("../controllers/seatsViewController");
const controllerAuditorium = require("../controllers/auditoriumsController");
const verifyRoles = require("../middleware/verifyRoles");
const verifyJWT = require("../middleware/verifyJWT");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Filename for the uploaded file
  },
});

const upload = multer({ storage: storage });

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const event = await controller.getEventById(id);
  res.send(event);
});

router.get("/:id/seatsView", async (req, res) => {
  try {
    const id = req.params.id;
    const partId = req.query.partId;
    const seats = await controllerSeats.getAllSeats(id, partId);
    res.status(200).send(seats);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  const { category, _start, _limit } = req.query;

  if (category && _start && _limit) {
    try {
      const events = await controller.getAllEvents(category, _start, _limit);
      res.send(events);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  } else {
    try {
      const notAllowedEvents = await controller.getNotAllowedEvents();
      res.send(notAllowedEvents);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
});

router.delete("/:id", verifyJWT, verifyRoles(1001), async (req, res) => {
  const id = req.params.id;
  const event = await controller.deleteEventById(id);
  res.send(event);
});

router.post(
  "/",
  verifyJWT,
  verifyRoles(2001),
  upload.single("image"),
  async (req, res) => {
    try {
      const eventDetails = req.body;
      eventDetails.eventPicUrl = req.file ? req.file.filename : "";
      eventDetails.eventIsAllowed =
        eventDetails.eventIsAllowed === "true" ? 1 : 0;

      if (
        eventDetails.auditoriumName === "OTHER" &&
        eventDetails.otherLocation
      ) {
        const newAuditorium = await controllerAuditorium.addAuditorium(
          eventDetails.otherLocation
        );
        eventDetails.auditoriumName = newAuditorium.auditoriumName;
      }

      const event = await controller.postEvent(eventDetails);

      res.sendStatus(201);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

router.put("/:id", verifyJWT, verifyRoles(1001), async (req, res) => {
  try {
    const eventDate = req.body.eventDate;
    const auditoriumId = req.body.auditoriumId;
    const id = req.params.id;

    const response = await controller.putEvent(id, eventDate, auditoriumId);
    res.send(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
