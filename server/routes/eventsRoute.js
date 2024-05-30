const express = require("express");
const router = express.Router();
const controller = require('../controllers/eventsController')
router.use (express.json());
router.use(express.urlencoded({ extended: true }));
// const photosRouter = require('./photosRoutes');
// router.use('/:albumId/photos', photosRouter);

router.get("/:id", async(req, res) => {
    const event = await controller.getEventById(id);
    res.send(event)
});
router.get("/", async(req, res) => {
    // const {query}= req.query;
    const events = await controller.getAllEvents();
    res.send(events)
    //we need to do the status
});
router.delete("/:id", async(req, res) => {
    const id = req.params.id;
    const event = await controller.deleteEventById(id);
    res.send(event)
});
// router.post("/", async (req, res) => { 
//     const title  = req.body; 
//     const event = await controller.postEventController(); 
//     res.send(event);
// });

// router.put("/:id", async(req, res) => {
//     const id = req.params.id;
//     const response=await controller.putAlbumController(req.body.title,id)
//     res.send(response);
// });
module.exports = router