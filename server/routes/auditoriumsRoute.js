const express = require('express');
const router = express.Router();
const controller = require('../controllers/auditoriumsController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.get("/", async (req, res) => {
    try{
        const audtoriumsParts = await controller.getAllAuditoriums();
        res.status(200).send(audtoriumsParts);
    }
    catch(error)
    {
        res.status(500).send({ message: err.message });
    }
   
});


module.exports = router;
