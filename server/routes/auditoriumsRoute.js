const express = require('express');
const router = express.Router();
const controller = require('../controllers/auditoriumsController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.get("/", async (req, res) => {
    const audtoriumsParts = await controller.getAllAuditoriums();
    res.send(audtoriumsParts)
});


module.exports = router;
