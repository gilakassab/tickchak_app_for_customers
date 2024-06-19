import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import '../css/Seats.css';
import PersonalInformation from './PersonalInformation';
import { EventContext } from '../components/App';


function Seats({ partId, partName, onBackToMap }) {
  const { id } = useParams();
  const [map, setMap] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showPersonalInformation, setShowPersonalInformation] = useState(false);
  const { selectedEvent } = useContext(EventContext);


  useEffect(() => {
    if (partId) {
      fetch(`http://localhost:3300/seatsView?eventId=${id}&partId=${partId}`)
        .then((res) => res.json())
        .then((newMap) => {
          setMap(newMap);
        });
    }
  }, [partId, id]);

  const handleMouseOver = () => {
    setShowTooltip(true);
  };

  const handleMouseOut = () => {
    setShowTooltip(false);
  };

  const handleContinue = () => {
    setShowPersonalInformation(true);
  };

  return (
    <div>
      {!showPersonalInformation && (
        <div>
          <h2>Take a seat in {selectedEvent.auditoriumName} | {partName}</h2>
          <div className="back-button-container">
            <button
              className="back-button"
              onClick={onBackToMap}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              ⇦
            </button>
            {showTooltip && <div className="back-button-tooltip">blocks map</div>}
          </div>
          <button className="continue-button" onClick={handleContinue}>
            CONTINUE
          </button>
          {/* Display seat map or any other details here */}
        </div>
      )}
      {showPersonalInformation && <PersonalInformation />}
    </div>
  );
}

export default Seats;
