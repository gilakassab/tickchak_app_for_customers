import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import emailjs from 'emailjs-com';

function Finish({ mySeats, personalInfo }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [screenshot, setScreenshot] = useState(null);

  useEffect(() => {
    const storedScreenshot = localStorage.getItem("screenshot");
    setScreenshot(storedScreenshot);

    const updateSeats = async () => {
      try {
        const seatIds = mySeats.map(seat => seat.seatId);
        const response = await fetch(`http://localhost:3300/seatsTaken`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventId: id, seatIds: seatIds }),
        });
        if (!response.ok) {
          throw new Error('Failed to update seat statuses');
        }
        const data = await response.json();
        console.log('Seats status updated:', data);
      } catch (error) {
        console.error('Error updating seat statuses:', error);
      }
    };

    const addUser = async () => {
      try {
        const response = await fetch(`http://localhost:3300/users`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userName: `${personalInfo.firstName} ${personalInfo.lastName}`,
            userPhone: personalInfo.phone,
            userEmail: personalInfo.email,
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to add user');
        }
        const data = await response.json();
        console.log('User added:', data);
      } catch (error) {
        console.error('Error adding user:', error);
      }
    };

    const sendEmail = () => {
      const emailParams = {
        user_name: `${personalInfo.firstName} ${personalInfo.lastName}`,
        user_email: personalInfo.email,
        message: 'Thank you for your purchase. Attached is your ticket.',
        attachment: screenshot,
      };
      emailjs.send('service_cg62ejf', 'template_nlwwqay', emailParams, 'Gg5fOmRM5xl63Jlko')
        .then((result) => {
          console.log('Email sent:', result.text);
        }, (error) => {
          console.error('Error sending email:', error.text);
        });
    };

    if (storedScreenshot) {
      updateSeats();
      addUser();
      sendEmail();
    } else {
      console.error('No screenshot found in local storage');
    }
  }, [mySeats, personalInfo, id, screenshot, navigate]);

  return (
    <div>
      {screenshot && <img src={screenshot} alt="Screenshot" />}
      <h1>הנתונים נשמרו בהצלחה. 
        נשלח מייל לכתובת המייל שציינת. 
        תודה שביקרת בטיקצא'ק. מחכים לכם</h1>
    </div>
  );
}

export default Finish;
