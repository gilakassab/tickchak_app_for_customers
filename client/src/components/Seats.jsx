import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import '../css/Seats.css';

function Seats({ partId }) {
    const { id } = useParams();
    const [seats, setSeats] = useState([]);
    
    useEffect(() => {
        if (id && partId) {
            console.log("react : eventid " + id + " partId " + partId);
            fetch(`http://localhost:3300/events/${id}/seatsView?partId=${partId}`)
                .then((res) => res.json())
                .then((newSeats) => {
                    setSeats(newSeats);
                });
        }
    }, [id, partId]);

    // Group seats by rowNumber
    const groupedSeats = seats.reduce((acc, seat) => {
        if (!acc[seat.rowNumber]) {
            acc[seat.rowNumber] = [];
        }
        acc[seat.rowNumber].push(seat);
        return acc;
    }, {});

    return (
        <div className='seats-container'>
            {Object.keys(groupedSeats).map(rowNumber => (
                <div key={rowNumber} className='seat-row'>
                    {groupedSeats[rowNumber].map(seat => (
                        <div key={seat.id} className={`seat-item ${!seat.seatIsVisible ? 'invisible-seat' : ''}`}>
                            {seat.seatIsVisible && <button className='btnSeats'>{seat.seatNumber}</button>}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Seats;
