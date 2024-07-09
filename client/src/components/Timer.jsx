import React, { useState, useEffect } from 'react';

function Timer({ eventDate, eventBeginAt }) {
  const [timeRemaining, setTimeRemaining] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const eventTime = new Date(eventDate);
      const [eventHour, eventMinute] = eventBeginAt.split(':');
      eventTime.setHours(eventHour); 
      eventTime.setMinutes(eventMinute);
    
      const timeDiff = eventTime.getTime() - now.getTime();

      if (timeDiff <= 0) {
        clearInterval(interval);
        setTimeRemaining({ days: '00', hours: '00', minutes: '00', seconds: '00' });
      } else {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        setTimeRemaining({
          days: days.toString().padStart(2, '0'),
          hours: hours.toString().padStart(2, '0'),
          minutes: minutes.toString().padStart(2, '0'),
          seconds: seconds.toString().padStart(2, '0')
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [eventDate, eventBeginAt]);

  return (
    <div className="timer">
      <div>
        <span>{timeRemaining.days}</span>
        <span>ימים</span>
      </div>
      <div>
        <span>{timeRemaining.hours}</span>
        <span>שעות</span>
      </div>
      <div>
        <span>{timeRemaining.minutes}</span>
        <span>דקות</span>
      </div>
      <div>
        <span>{timeRemaining.seconds}</span>
        <span>שניות</span>
      </div>
    </div>
  );
}

export default Timer;