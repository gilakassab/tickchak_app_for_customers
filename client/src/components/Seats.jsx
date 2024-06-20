
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import '../css/Seats.css';
import PersonalInformation from './PersonalInformation';
import { EventContext } from '../components/App';

function Seats({ partId, partName, onBackToMap }) {
  const { id } = useParams();
  // const [map, setMap] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showPersonalInformation, setShowPersonalInformation] = useState(false);
  const { selectedEvent } = useContext(EventContext);
  const [seats,setSeats]=useState([]);
  const [selectedSeats, setSelectedSeats]=useState([seats]);
    
    useEffect(() => {
        if (id && partId) {
            console.log("react : eventid " + id + " partId " + partId);
            fetch(`http://localhost:3300/events/${id}/seatsView?partId=${partId}`)
                .then((res) => res.json())
                .then((newSeats) => {
                    setSeats(newSeats);
                    console.log(newSeats);
                });
        }
    }, []);
    // Group seats by rowNumber
    const groupedSeats = seats.reduce((acc, seat) => {
        if (!acc[seat.rowNumber]) {
            acc[seat.rowNumber] = [];
        }
        acc[seat.rowNumber].push(seat);
        return acc;
    }, {});

  const handleSeatChosen = (seatId, seatIsTaken) => {
    setSelectedSeats((prevSeats) => ({
      ...prevSeats,
      [seatId]: !seatIsTaken
    }));
  };
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
          <div className='seats-container'>
            {Object.keys(groupedSeats).map(rowNumber => (
                <div key={rowNumber} className='seat-row'>
                    {groupedSeats[rowNumber].map(seat => (
                        <div key={seat.id} className={`seat-item ${!seat.seatIsVisible ? 'invisible-seat' : ''}`}>
                            {seat.seatIsVisible && <button  className='btnSeats'>{seat.seatNumber}</button>}
                        </div>
                    ))}
                </div>
            ))}
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


