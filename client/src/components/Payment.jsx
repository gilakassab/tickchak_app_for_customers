import React, { useContext, useState, useEffect } from 'react';
import { EventContext } from '../components/App';
import Finish from './Finish';
import "../css/Payment.css";

const Payment = ({ mySeats, personalInfo }) => {
  const { setActiveComponent } = useContext(EventContext);
  const [paymentMade, setPaymentMade] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardHolderName: '',
    expirationDate: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({
    cardNumber: '',
    cardHolderName: '',
    expirationDate: '',
    cvv: ''
  });
  const [touchedFields, setTouchedFields] = useState({
    cardNumber: false,
    cardHolderName: false,
    expirationDate: false,
    cvv: false
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
    setTouchedFields({ ...touchedFields, [name]: true });

    // Validate the field if it's cardHolderName
    if (name === 'cardHolderName') {
      validateField(name, value);
    }
  };

  const handleCardNumberChange = (e) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      setPaymentInfo({ ...paymentInfo, cardNumber: value });
    }
    setTouchedFields({ ...touchedFields, cardNumber: true });
  };

  const handleCvvChange = (e) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      setPaymentInfo({ ...paymentInfo, cvv: value });
    }
    setTouchedFields({ ...touchedFields, cvv: true });
  };

  const handleCardHolderNameChange = (e) => {
    const { value } = e.target;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setPaymentInfo({ ...paymentInfo, cardHolderName: value });
      setTouchedFields({ ...touchedFields, cardHolderName: true });
      validateField('cardHolderName', value);
    }
  };

  const validateField = (fieldName, value) => {
    let error = '';

    switch (fieldName) {
      case 'cardNumber':
        if (!/^\d{16}$/.test(value)) {
          error = 'Card number must be exactly 16 digits';
        }
        break;
      case 'cardHolderName':
        if (value.trim().length === 0) {
          error = 'Card holder name is required';
        }
        break;
      case 'expirationDate':
        const today = new Date();
        const expirationDate = new Date(paymentInfo.expirationDate);
        if (expirationDate <= today) {
          error = 'Expiration date must be a future date';
        }
        break;
      case 'cvv':
        if (!/^\d{3}$/.test(value)) {
          error = 'CVV must be exactly 3 digits';
        }
        break;
      default:
        break;
    }

    setErrors({ ...errors, [fieldName]: error });
  };

  useEffect(() => {
    const newFormErrors = {};

    if (touchedFields.cardNumber) {
      validateField('cardNumber', paymentInfo.cardNumber);
    }
    if (touchedFields.cardHolderName) {
      validateField('cardHolderName', paymentInfo.cardHolderName);
    }
    if (touchedFields.expirationDate) {
      validateField('expirationDate', paymentInfo.expirationDate);
    }
    if (touchedFields.cvv) {
      validateField('cvv', paymentInfo.cvv);
    }

    // Check overall form validity
    setIsFormValid(Object.values(errors).every(error => error === ''));

    // Check if all fields are touched and valid
    const allFieldsTouched = Object.values(touchedFields).every(field => field === true);
    setIsButtonEnabled(allFieldsTouched && isFormValid);

  }, [paymentInfo, touchedFields, errors, isFormValid]);

  const handleClickSubmit = (event) => {
    event.preventDefault();
    if (isButtonEnabled) {
      setPaymentMade(true);
      setActiveComponent("finish");
    } else {
      // Mark all fields as touched to show errors
      setTouchedFields({
        cardNumber: true,
        cardHolderName: true,
        expirationDate: true,
        cvv: true
      });
    }
  };

  return (
    <div >
      {!paymentMade ? (
        <div className='payment-container'>
          <h2 className="payment-title">Payment</h2>
          <form onSubmit={handleClickSubmit} className="payment-form">
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={paymentInfo.cardNumber}
                onChange={handleCardNumberChange}
                onBlur={() => setTouchedFields({ ...touchedFields, cardNumber: true })}
                required
                className={`form-control ${touchedFields.cardNumber && errors.cardNumber ? 'invalid' : ''}`}
              />
              {touchedFields.cardNumber && errors.cardNumber && <p className="error-message-payment">{errors.cardNumber}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="cardHolderName">Card Holder Name</label>
              <input
                type="text"
                id="cardHolderName"
                name="cardHolderName"
                value={paymentInfo.cardHolderName}
                onChange={handleCardHolderNameChange}
                onBlur={() => setTouchedFields({ ...touchedFields, cardHolderName: true })}
                required
                className={`form-control ${touchedFields.cardHolderName && errors.cardHolderName ? 'invalid' : ''}`}
              />
              {touchedFields.cardHolderName && errors.cardHolderName && <p className="error-message-payment">{errors.cardHolderName}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="expirationDate">Expiration Date</label>
              <input
                type="date"
                id="expirationDate"
                name="expirationDate"
                value={paymentInfo.expirationDate}
                onChange={handleInputChange}
                onBlur={() => setTouchedFields({ ...touchedFields, expirationDate: true })}
                required
                className={`form-control ${touchedFields.expirationDate && errors.expirationDate ? 'invalid' : ''}`}
              />
              {touchedFields.expirationDate && errors.expirationDate && <p className="error-message-payment">{errors.expirationDate}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={paymentInfo.cvv}
                onChange={handleCvvChange}
                onBlur={() => setTouchedFields({ ...touchedFields, cvv: true })}
                required
                className={`form-control ${touchedFields.cvv && errors.cvv ? 'invalid' : ''}`}
              />
              {touchedFields.cvv && errors.cvv && <p className="error-message-payment">{errors.cvv}</p>}
            </div>
            <button type="submit" disabled={!isButtonEnabled} className="btn-primary">Pay Now</button>
          </form>
        </div>
      ) : (
        <Finish mySeats={mySeats} personalInfo={personalInfo} />
      )}
    </div>
  );
};

export default Payment;
