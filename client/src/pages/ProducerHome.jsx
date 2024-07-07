import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/ProducerHome.css';

function ProducerHome() {
  const navigate = useNavigate();
  const { id } = useParams(); // משיכת ה-ID מה-URL

  const handleAddEventClick = () => {
    navigate(`/tickchak/producer/${id}/newevent`); // ניווט לניתוב המתאים להוספת אירוע חדש
  };

  return (
    <div className="producer-home">
      <button onClick={() => { navigate('/tickchak/home'); }} className="back-button">Home</button>
      <h2>Producer Home</h2>
      <button onClick={handleAddEventClick} className="add-event-button">Add New Event</button>
    </div>
  );
}

export default ProducerHome;
