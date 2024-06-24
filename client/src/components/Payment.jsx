import React, { useState } from 'react';
import Finish from './Finish';
import "../css/Payment.css";

const Payment = ({mySeats,personalInfo,timer}) => {
  const [paymentMade, setPaymentMade] = useState(false);

  const handleClickSubmit = (event) => {
    event.preventDefault();
    setPaymentMade(true);
  }
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div>
      { !paymentMade ? (
        <>
          <h2>Payment</h2>
          <form onSubmit={handleClickSubmit}>
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input type="text" id="cardNumber" name="cardNumber" required />
            </div>
            <div className="form-group">
              <label htmlFor="cardHolderName">Card Holder Name</label>
              <input type="text" id="cardHolderName" name="cardHolderName" required />
            </div>
            <div className="form-group">
              <label htmlFor="expirationDate">Expiration Date</label>
              <input type="text" id="expirationDate" name="expirationDate" required />
            </div>
            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input type="text" id="cvv" name="cvv" required />
            </div>
            <button type="submit">Pay Now</button>
          </form>
        </>
      ) : (
        <Finish mySeats={mySeats} personalInfo={personalInfo}/>
      )}
    </div>
  );
};

export default Payment;
