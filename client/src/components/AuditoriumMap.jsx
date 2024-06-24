import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { EventContext } from './App';
import '../css/AuditoriumMap.css'; // Ensure this CSS file exists
import Seats from './Seats';

function AuditoriumMap({ onContinue }) {
    const { selectedEvent, setSelectedEvent } = useContext(EventContext);
    const { id } = useParams(); // Get event ID from URL
    const [map, setMap] = useState([]);
    const [seatsVisible, setSeatsVisible] = useState(false);
    const [partId, setPartId] = useState(0);
    const [blocksOfPart, setBlocksOfPart] = useState("");
    const [partName, setPartName] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!selectedEvent) {
            fetchEventFromServer(id);
        } else {
            fetchAuditoriumParts(selectedEvent.auditoriumId);
        }
    }, [selectedEvent, id]);

    const fetchEventFromServer = async (id) => {
        try {
            const response = await fetch(`http://localhost:3300/events/${id}`);
            const event = await response.json();
            setSelectedEvent(event);
            fetchAuditoriumParts(event.auditoriumId);
        } catch (error) {
            console.error("Error fetching event:", error);
            setLoading(false);
        }
    };

    const fetchAuditoriumParts = async (auditoriumId) => {
        try {
            const response = await fetch(`http://localhost:3300/auditoriumsParts?auditoriumId=${auditoriumId}`);
            const newMap = await response.json();
            
            setMap(newMap);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching auditorium parts:", error);
            setLoading(false);
        }
    };

    const handleClick = (part) => {
        setPartId(part.partId);
        setBlocksOfPart(map[partId].numOfRowsAndSeats)
        setPartName(part.partName);
        setSeatsVisible(true);
    };

    const handleBackToMap = () => {
        setSeatsVisible(false);
        setPartId(null);
        setPartName(null);
    };

    const getPolygonCenter = (coords) => {
        const points = coords.split(" ").map(point => point.split(",").map(Number));
        const x = points.reduce((sum, point) => sum + point[0], 0) / points.length;
        const y = points.reduce((sum, point) => sum + point[1], 0) / points.length;
        return { x, y };
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!selectedEvent) {
        return <div>No event selected</div>;
    }

    return (
        <div className="auditorium-map-container">
            {!seatsVisible && ( 
                <>
                    <h2>Take a seat in {selectedEvent.auditoriumName}</h2>
                    <svg key={selectedEvent.auditoriumId} viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet">
                        {map.map(part => (
                            <g key={part.partId} onClick={() => handleClick(part)}>
                                <polygon
                                    points={part.coords}
                                    fill="black"
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
                <Seats partId={partId} partName={partName} blocksOfPart={blocksOfPart} onBackToMap={handleBackToMap} onContinue={onContinue} />
            )}
        </div>
    );
}

export default AuditoriumMap;
