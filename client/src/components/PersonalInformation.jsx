import React, { useState } from 'react';
import '../css/PersonalInformation.css';
import Payment from './Payment';

const PersonalInformation = ({ mySeats, timer, onContinue }) => {
  const [showPersonalInformation, setShowPersonalInformation] = useState(true);
  const [showPayment, setShowPayment] = useState(false);

  const handleContinue = (event) => {
    event.preventDefault();
    setShowPersonalInformation(false);
    setShowPayment(true);
    onContinue('payment');
  };

  const calculateTotal = () => {
    const pricePerSeat = 50; // מחיר כרטיס אחד
    return mySeats.length * pricePerSeat;
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="personal-information-container">
      {showPersonalInformation && (
        <>
         {mySeats.length > 0 && (
            <div className="timer-circle">
              {formatTime(timer)}
            </div>
          )}
          <div className="personal-information">
            <h2>Personal Information</h2>
            <form>
              <div className="form-group">
                <label htmlFor="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName" />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input type="tel" id="phone" name="phone" />
              </div>
              <button className="continue-button" onClick={handleContinue}>
                Continue
              </button>
            </form>
          </div>
          <div className="order-summary">
            <h3>Order Summary</h3>
            <ul>
              {mySeats.map((seat, index) => (
                <li key={index}>
                  Row: {seat.rowNumber}, Seat: {seat.seatNumber}
                </li>
              ))}
            </ul>
            <div className="total">
              Total: ${calculateTotal()}
            </div>
          </div>
        </>
      )}

      {showPayment && <Payment mySeats={mySeats} timer={timer} />}
    </div>
  );
};

export default PersonalInformation;
