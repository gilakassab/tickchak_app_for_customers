const express = require("express");
const router = express.Router();
const controller = require('../controllers/eventsController')
const controllerSeats = require('../controllers/seatsViewController');
const verifyRoles = require("../middleware/verifyRoles");


router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// const photosRouter = require('./photosRoutes');
// router.use('/:albumId/photos', photosRouter);

router.get("/:id" ,async (req, res) => {
    const id = req.params.id;
    const event = await controller.getEventById(id);
    res.send(event);
});

router.get("/:id/seatsView", async (req, res) => {
    try{
        
        const id = req.params.id;
        const partId = req.query.partId;
        console.log(req.query);
        const seats = await controllerSeats.getAllSeats(id,partId);
        res.status(200).send(seats);
    }
      catch (err) {
        res.status(500).send({ message: err.message });
  }
});



router.get("/", async (req, res) => {
    const { category, _start, _limit } = req.query;

    if (category && _start && _limit) {
        // אם כל המשתנים קיימים, עבור לפונקציה הראשונה
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

router.delete("/:id",verifyRoles(["admin"]), async (req, res) => {
    const id = req.params.id;
    const event = await controller.deleteEventById(id);
    res.send(event)
});
router.post("/", async (req, res) => {
    console.log("Received POST request with body:", req.body);
    try {
      const eventDetails = req.body;
      const event = await controller.postEvent(eventDetails);
      res.status(201).send(event);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

router.put("/:id",verifyRoles(["admin"]), async(req, res) => {
    try{
        const id = req.params.id;
        const eventIsAllowed = req.body.eventIsAllowed;
        const response=await controller.putEvent(id,eventIsAllowed);
        res.send(response);
    }
   catch(error){
    res.status(500).send({ message: error.message });
   }
   
   
});


module.exports = router