import React, { useState, useEffect } from 'react';

function Timer({ eventDate, eventBeginAt }) {
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const eventTime = new Date(eventDate);
      const [eventHour, eventMinute] = eventBeginAt.split(':');
      eventTime.setHours(eventHour); 
      eventTime.setMinutes(eventMinute);
    
      // חישוב הזמן הנותר עד להופעה הבאה
      const timeDiff = eventTime.getTime() - now.getTime();

      // חישוב הימים, השעות, הדקות והשניות מהזמן הנותר
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      // בדיקה האם הזמן נגמר, ואם כן - עצירה ועדכון הזמן ל-00:00:00:00
      if (timeDiff <= 0) {
        clearInterval(interval);
        setTimeRemaining('00:00:00:00');
      } else {
        // יצירת המחרוזת של הטקסט המוצג
        const formattedTimeRemaining = `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        // עדכון הזמן הנותר בסטייט
        setTimeRemaining(formattedTimeRemaining);
      }
    }, 1000);

    // ניקוי הטיימר בכל פעם שהקומפוננטה מורדת
    return () => clearInterval(interval);
  }, [eventDate, eventBeginAt]);

  return (
    <div className='timer'>
      {timeRemaining}
    </div>
  );
}

export default Timer;

