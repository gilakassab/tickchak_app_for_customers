import React, { useState, useEffect } from 'react';

function Timer({ eventDate, eventBeginAt }) {
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const eventTime = new Date(eventDate);
      const [eventHour, eventMinute] = eventBeginAt.split(':');
      eventTime.setHours(eventHour); // הגדרת שעת ההופעה
      eventTime.setMinutes(eventMinute);
    
      // חישוב הזמן הנותר עד להופעה הבאה
      const timeDiff = eventTime.getTime() - now.getTime();

      // חישוב הימים, השעות, הדקות והשניות מהזמן הנותר
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      // יצירת המחרוזת של הטקסט המוצג
      const formattedTimeRemaining = `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;


      // עדכון הזמן הנותר בסטייט
      setTimeRemaining(formattedTimeRemaining);

      // בדיקה האם הזמן נגמר, ואם כן - נסיון לנקות את הטיימר
      if (timeDiff <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    // ניקוי הטיימר בכל פעם שהקומפוננטה מורדת
    return () => clearInterval(interval);
  }, [eventDate, eventBeginAt]);

  return (
    <div className='timer'>
      {timeRemaining}
    </div>
  );
}

export default Timer;

// const signIn = async (userName, password) => {
//   try {
//     const response = await fetch(`http://localhost:3000/signIn`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       body: JSON.stringify({ userName, password }),
//     });
//     const userFromDB = await response.json();
//     // console.log(userFromDB)
//     if (response.ok) {
//       // console.log("userFromDB")
//       // console.log(userFromDB)
//       setUser(userFromDB);
//       navigate("./");
//     } else {
//       throw new Error(
//         userFromDB.message || "An error occurred. Please try again."
//       );
//     }
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };
// router.post("/", async (req, res) => {
// try {
//   // console.log("sign in")
//   const userName = req.body.userName;
//   const password = req.body.password;
//   const user = await getByPasswordAndUserName(password, userName);
//   req.session.user = {
//     id: user.id,
//     username: user.userName,
//     role: user.role,
//   };
//   res.status(200).send(user);
// } catch (err) {
//   if (err.message == "User does not exist in the system. Want to create an account? Contact Us 02-6237600 or yael.b@c-b-cpa.co.il")
//     res.status(400).send({ message: err.message });
//   else if (err.message == "the password or userName is incorrect")
//     res.status(400).send({ message: err.message });
//   else res.status(500).send({ message: err.message });
// }
// });

