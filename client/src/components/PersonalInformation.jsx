import React, { useContext, useState, useEffect } from 'react';
import { EventContext } from '../components/App';
import '../css/PersonalInformation.css';
import Payment from './Payment';

const PersonalInformation = ({ mySeats, timer }) => {
  const { selectedEvent, setActiveComponent } = useContext(EventContext); 
  const [showPersonalInformation, setShowPersonalInformation] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    checkFormValidity();
  }, [personalInfo, errors]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'firstName':
      case 'lastName':
        if (value.length < 2) {
          error = 'Name must be at least 2 characters long';
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          error = 'Invalid email address';
        }
        break;
      case 'phone':
        const phoneRegex = /^\d+$/;
        if (!phoneRegex.test(value)) {
          error = 'Phone number must contain only digits';
        }
        break;
      default:
        break;
    }

    setErrors({ ...errors, [name]: error });
  };

  const checkFormValidity = () => {
    const { firstName, lastName, email, phone } = personalInfo;
    const isValid = 
      firstName.length >= 2 && 
      lastName.length >= 2 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && 
      /^\d+$/.test(phone);
    setIsFormValid(isValid);
  };

  const handleContinue = (event) => {
    event.preventDefault();
    if (isFormValid) {
      setShowPersonalInformation(false);
      setShowPayment(true);
      setActiveComponent("payment"); 
    }
  };

  const calculateTotal = () => {
    console.log(selectedEvent);
    const pricePerSeat = selectedEvent.ticketPrice; // מחיר כרטיס אחד
    return mySeats.length * pricePerSeat;
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <>
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
                {errors.firstName && <span className="error">{errors.firstName}</span>}
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
                {errors.lastName && <span className="error">{errors.lastName}</span>}
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
                {errors.email && <span className="error">{errors.email}</span>}
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
                {errors.phone && <span className="error">{errors.phone}</span>}
              </div>
              <button 
                className="continue-button" 
                onClick={handleContinue} 
                disabled={!isFormValid}
              >
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
 </div>
      {showPayment && <Payment mySeats={mySeats} personalInfo={personalInfo} />}
  </>
  );
};

export default PersonalInformation;
