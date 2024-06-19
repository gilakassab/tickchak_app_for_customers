import React, { useState } from 'react';
import '../css/PersonalInformaition.css';
import Payment from './Payment';

const PersonalInformation = () => {
  const [showPersonalInformation, setShowPersonalInformation] = useState(true);
  const [showPayment, setShowPayment] = useState(false);

  const handleContinue = () => {
    setShowPersonalInformation(false);
    setShowPayment(true);
  };

  return (
    <div>
      {showPersonalInformation && (
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
              continue
            </button>
          </form>
        </div>
      )}

      {showPayment && <Payment />}
    </div>
  );
};

export default PersonalInformation;
