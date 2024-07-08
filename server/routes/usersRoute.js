const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// router.route('/')
//     .get(verifyJWT, employeesController.getAllEmployees)
//     .post(employeesController.createNewEmployee)
//     .put(employeesController.updateEmployee)
//     .delete(employeesController.deleteEmployee);

// router.route('/:id')
//     .get(employeesController.getEmployee);

//לבדוק אם באמת לא צריך
// router.get("/:id", async (req, res) => {
//     const event = await controller.getEventById(id);
//     res.send(event)
// });


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
        res.status(200).send(users);
    }
      catch (err) {
        res.status(500).send({ message: err.message });
  }
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
