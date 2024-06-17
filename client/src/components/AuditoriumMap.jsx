import React, { useContext, useState, useEffect } from 'react';
import { EventContext } from './App';
import '../css/AuditoriumMap.css'; // Ensure this CSS file exists
import Seats from './Seats';

function AuditoriumMap() {
    const { selectedEvent } = useContext(EventContext);
    const [map, setMap] = useState([]);
    const [seatsVisible, setSeatsVisible] = useState(false);
    const [partId, setPartId] = useState(null);

    useEffect(() => {
        if (selectedEvent) {
            fetch(`http://localhost:3300/auditoriumsParts?auditoriumId=${selectedEvent.auditoriumId}`)
                .then((res) => res.json())
                .then((newMap) => {
                    setMap(newMap);
                });
        }
    }, [selectedEvent]);

    const handleClick = (part) => {
        console.log(part.partName, part.coords);
        setPartId(part.partId);
        setSeatsVisible(true);
    };

    const getPolygonCenter = (coords) => {
        const points = coords.split(" ").map(point => point.split(",").map(Number));
        const x = points.reduce((sum, point) => sum + point[0], 0) / points.length;
        const y = points.reduce((sum, point) => sum + point[1], 0) / points.length;
        return { x, y };
    };

    return (
        <div className="auditorium-map-container">
            {!seatsVisible && (
                <>
                    <h2>Auditorium Map</h2>
                    <svg viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet">
                        {map.map(part => (
                            <g key={part.id} onClick={() => handleClick(part)}>
                                <polygon
                                    points={part.coords}
                                    fill="black"
                                    // stroke="#000"
                                    // strokeWidth="1"
                                    className="auditorium-part"
                                />
                                <text
                                    x={getPolygonCenter(part.coords).x}
                                    y={getPolygonCenter(part.coords).y}
                                    textAnchor="middle"
                                    fill="white"
                                    fontSize="12"
                                    className='textMap'
                                  
                                >
                                    {part.partName}
                                </text>
                            </g>
                        ))}
                    </svg>
                </>
            )}
            {seatsVisible && (
                <Seats partId={partId} />
            )}
        </div>
    );
}

export default AuditoriumMap;
