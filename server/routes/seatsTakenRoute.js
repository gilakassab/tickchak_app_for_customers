const express = require('express');
const router = express.Router();
const controller = require('../controllers/seatsTakenController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));



// router.get("/:id", async (req, res) => {
//     const event = await controller.getEventById(id);
//     res.send(event)
// });

router.get("/", async (req, res) => {
    // try{
    
    //     const partId = req.query.partId;
    //     console.log("ROUTE "+ req.query.eventId);
    //     const seats = await controller.getAllSeats(partId);
    //     res.status(200).send(seats)
    // }
    // catch(err){
    //     res.status(500).send({ message: err.message });
    // }
   
});
router.put("/", async (req, res) => {
    try{
        const id = req.body.eventId;
        const seatIds = req.body.seatIds;
        console.log("eventid - ",id);
        console.log("seatIds - ",seatIds);
        const seats = await controller.putSeatsTaken(id,seatIds);
        res.status(200).send(seats);
    }
      catch (err) {
        res.status(500).send({ message: err.message });
  }
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


module.exports = router;
//router.get("/clients", async (req, res) => {
    // try {
    //     const id = req.query.id;
    //     const clientOfEmployee = await getClientsEmployee(id);
    //     res.status(200).send(clientOfEmployee);
    //   } catch (err) {
    //     res.status(500).send({ message: err.message });
    //   }
    // });
    
    // זה בראוטר
    // fetch(`http://localhost:3000/users/clients?id=${user.id}`, {
    //         method: "GET",
    //         headers: { "Content-Type": "application/json" },
    //         credentials: "include",
    //       })
    //         .then((response) => {
    //           if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //           }
    //           return response.json();
    //         })
    //         .then((data) => {
    //           // console.log(data);
    //           setUsers(data);
    //         })
    //         .catch((error) => setFetchError(error.message));
    //     }
    
   
    // try {
    //       const response = await fetch(`http://localhost:3000/signUp`, {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         credentials: "include",
    //         body: JSON.stringify({ userName, password, employeType, role }),
    //       });
    //       const data = await response.json();
    //       if (response.ok) {
    //         navigate("./");
    //       } else {
    //         throw new Error(data.message || "An error occurred. Please try again.");
    //       }
    //     } catch (error) {
    //       throw new Error(error.message);
    //     }
    
