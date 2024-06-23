import React, { useState } from 'react';
import '../css/PersonalInformation.css';
import Payment from './Payment';

const PersonalInformation = ({ mySeats }) => {
  const [showPersonalInformation, setShowPersonalInformation] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
console.log(mySeats);
  const handleContinue = (event) => {
    event.preventDefault();
    setShowPersonalInformation(false);
    setShowPayment(true);
  };

  const calculateTotal = () => {
    const pricePerSeat = 50; // מחיר כרטיס אחד
    return mySeats.length * pricePerSeat;
  };

  return (
    <div className="personal-information-container">
      {showPersonalInformation && (
        <>
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

      {showPayment && <Payment />}
    </div>
  );
};

export default PersonalInformation;
