import React, { useContext, useState, useEffect } from 'react';
import { EventContext } from './App';
import '../css/AuditoriumMap.css'; // קשר לקובץ ה־CSS

function AuditoriumMap() {
    const { selectedEvent } = useContext(EventContext);
    const [map, setMap] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3300/auditoriumsParts?auditoriumId=${selectedEvent.auditoriumId}`)
            .then((res) => res.json())
            .then((newMap) => {
                setMap(newMap);
            });
    }, [selectedEvent]);

    const handleClick = (coords) => {
        // Handle click based on coordinates
        console.log('Clicked coordinates:', coords);
        // You can add more functionality here based on what you want to do with the coordinates
    };

    return (
        <div className="auditorium-map-container"> {/* הוספתי את המחלקה שהמקום עליך להיתקן ב CSS */}
            <h2>Auditorium Map</h2>
            <svg width="400" height="200">
                {map.map(part => (
                    <polygon
                        key={part.id}
                        points={part.coords}
                        fill="#ccc"
                        stroke="#000"
                        strokeWidth="1"
                        onClick={() => handleClick(part.coords)}
                        className="auditorium-part"
                    />
                ))}
            </svg>
        </div>
    );
}

export default AuditoriumMap;
