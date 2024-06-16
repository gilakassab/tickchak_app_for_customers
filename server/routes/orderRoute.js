const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));



// router.get("/:id", async (req, res) => {
//     const event = await controller.getEventById(id);
//     res.send(event)
// });
// router.get("/", async (req, res) => {
//     const { category, _start, _limit } = req.query;
//     console.log("req.query")
//     console.log(req.query)
//     const events = await controller.getAllEvents(category, _start, _limit);
//     res.send(events)

// });
// router.delete("/:id", async (req, res) => {
//     const id = req.params.id;
//     const event = await controller.deleteEventById(id);
//     res.send(event)
// });
// router.post("/", async (req, res) => { 
//     // const title  = req.body; 
//     // const event = await controller.postEvent(); 
//     // res.send(event);
// });

// router.put("/:id", async(req, res) => {
//     // const id = req.params.id;
//     // const response=await controller.putEvent(req.body.title,id)
//     // res.send(response);
// });
module.exports = router;
