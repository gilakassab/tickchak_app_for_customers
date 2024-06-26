import React, { useState } from 'react';
import '../css/PersonalInformation.css';
import Payment from './Payment';

const PersonalInformation = ({ mySeats, timer }) => {
  const [showPersonalInformation, setShowPersonalInformation] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

  const handleContinue = (event) => {
    event.preventDefault();
    setShowPersonalInformation(false);
    setShowPayment(true);
    // onContinue('payment');
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
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={personalInfo.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={personalInfo.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={personalInfo.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={personalInfo.phone}
                  onChange={handleInputChange}
                />
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

      {showPayment && <Payment mySeats={mySeats} personalInfo={personalInfo} />}
    </div>
  );
};

export default PersonalInformation;
