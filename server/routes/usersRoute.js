const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
      const producerName = await controller.getProducerNameById(id);
      res.status(200).json({ producerName });
  } catch (err) {
      console.error("Error fetching producer name:", err);
      res.status(500).json({ error: "Failed to fetch producer name" });
  }
});

router.post("/", async (req, res) => {
    try{
        const userName = req.body.userName;
        const userPhone = req.body.userPhone;
        const userEmail = req.body.userEmail;
        const users = await controller.postUser(userName,userPhone,userEmail);
          res.sendStatus(200); // שליחת תגובה עם קוד סטטוס 200 והמשתמשים
      } catch (err) {
          res.sendStatus(500); // שליחת תגובה עם קוד סטטוס 500 והודעת שגיאה
      }
      
});

module.exports = router;
