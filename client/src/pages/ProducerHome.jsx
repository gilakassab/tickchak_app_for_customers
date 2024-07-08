import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa'; // ייבוא האייקון
import '../css/ProducerHome.css';

function ProducerHome() {
  const navigate = useNavigate();
  const { id } = useParams(); // משיכת ה-ID מה-URL
  const [producerName, setProducerName] = useState('');

  useEffect(() => {
    // כאשר הרכיב מורכב, קרא לפונקציה לקבלת שם המפיק
    fetchProducerName();
  }, []);

  const fetchProducerName = async () => {
    try {
      const response = await fetch(`http://localhost:3300/users/${id}`);
      if (response.ok) {
        const data = await response.json();
        setProducerName(data.producerName); // שימוש במאפיין producerName במקום name
        console.log("producerName", data);
      } else {
        console.error('Failed to fetch producer name');
      }
    } catch (error) {
      console.error('Error fetching producer name:', error);
    }
  };

  const handleAddEventClick = () => {
    navigate(`/tickchak/producer/${id}/newevent`); // ניווט לניתוב המתאים להוספת אירוע חדש
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3300/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
        navigate('/tickchak/producerlogin');
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="producer-home">
      <nav className="nav-bar">
        <div className="nav-bar-left">
          <button onClick={() => navigate('/tickchak/home')} className="site-logo">Tickchak</button>
        </div>
        <div className="nav-bar-right">
          <button onClick={handleLogout} className="nav-button">Logout</button>
        </div>
      </nav>
      <div className="nav-bar-line"></div>
      <div className="content">
        <h2 className="prod-title">Hi, {producerName}! Good to see you.</h2>
        <button onClick={handleAddEventClick} className="add-event-button">
          <FaPlus style={{ marginRight: '8px' }} /> {/* הוספת האייקון לכפתור */}
          Add New Event
        </button>
      </div>
    </div>
  );
}

export default ProducerHome;
