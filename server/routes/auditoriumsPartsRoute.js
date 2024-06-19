const express = require('express');
const router = express.Router();
const controller = require('../controllers/auditoriumsPartsController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));



// router.get("/:id", async (req, res) => {
//     const event = await controller.getEventById(id);
//     res.send(event)
// });

router.get("/", async (req, res) => {
    const { auditoriumId} = req.query;
    const audtoriumsParts = await controller.getAllAuditoriumParts(auditoriumId);
    res.send(audtoriumsParts)
});

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
