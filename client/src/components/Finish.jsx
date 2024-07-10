import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import emailjs from 'emailjs-com';
import "../css/Finish.css";


function Finish({ mySeats, personalInfo }) {

  const { id } = useParams();
  const navigate = useNavigate();
  // const [screenshot, setScreenshot] = useState(null);

  useEffect(() => {
    // const storedScreenshot = localStorage.getItem("screenshot");
    // setScreenshot(storedScreenshot);

    const updateSeats = async () => {
      try {
        const seatIds = mySeats.map(seat => seat.seatId);
        const response = await fetch(`http://localhost:3300/seatsTaken`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventId: id, seatIds: seatIds }),
          credentials: "include"
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
          credentials: "include"
        });
        if (!response.ok) {
          throw new Error('Failed to add user');
        }
       
      } catch (error) {
        console.error('Error adding user:', error);
      }
    };

    const sendEmail = () => {
      const emailParams = {
        user_name: `${personalInfo.firstName} ${personalInfo.lastName}`,
        user_email: personalInfo.email,
        message: `Thank you for your purchase. Attached is your ticket. ${mySeats.map(seat => `ROW: ${seat.rowNumber} SEAT: ${seat.seatNumber}`).join(', ')}`,
      };
      emailjs.send('service_cg62ejf', 'template_nlwwqay', emailParams, 'Gg5fOmRM5xl63Jlko')
        .then((result) => {
         console.log('Email sent:', result.text);
        }, (error) => {
          console.error('Error sending email:', error.text);
        });
    };

      updateSeats();
      addUser();
      sendEmail();
   } ,[mySeats, personalInfo, id, navigate]);

  return (
    <div className='success-message-finish'>
      <h1> The data was saved successfully. An email will be sent to the email address you specified. Thank you for visiting Tikchak. waiting for you!</h1>
    </div>
  );
}

export default Finish;
