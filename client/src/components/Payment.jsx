import React from 'react';
import "../css/Payment.css";

const Payment = () => {
  return (
    <div>
      <h2>Payment</h2>
      <form>
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
    </div>
  );
};

export default Payment;
