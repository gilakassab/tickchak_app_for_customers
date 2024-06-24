const express = require("express");
const router = express.Router();
const controller = require('../controllers/eventsController')
const controllerSeats = require('../controllers/seatsViewController')


router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// const photosRouter = require('./photosRoutes');
// router.use('/:albumId/photos', photosRouter);

router.get("/:id", async (req, res) => {
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
    const events = await controller.getAllEvents(category, _start, _limit);
    res.send(events)

});
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const event = await controller.deleteEventById(id);
    res.send(event)
});
router.post("/", async (req, res) => { 
    // const title  = req.body; 
    // const event = await controller.postEvent(); 
    // res.send(event);
});

router.put("/:id", async(req, res) => {
    // const id = req.params.id;
    // const response=await controller.putEvent(req.body.title,id)
    // res.send(response);
});


module.exports = router