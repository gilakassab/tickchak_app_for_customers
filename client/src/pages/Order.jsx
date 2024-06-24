import React, { useState } from 'react';
import MainHeader from '../components/MainHeader';
import AuditoriumMap from '../components/AuditoriumMap';
import PersonalInformation from '../components/PersonalInformation';
import Payment from '../components/Payment';

function Order() {
  const [currentStep, setCurrentStep] = useState('order');

  const handleContinue = (nextStep) => {
    setCurrentStep(nextStep);
  };

  return (
    <div>
      <MainHeader headerPage={currentStep} />

      {currentStep === 'order' && <AuditoriumMap onContinue={() => handleContinue('personalInformation')} />}
      {currentStep === 'personalInformation' && <PersonalInformation onContinue={() => handleContinue('payment')} />}
      {currentStep === 'payment' && <Payment />}
    </div>
  );
}

export default Order;
