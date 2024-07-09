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
            const response = await fetch(`http://localhost:3300/events/${id}`,
                {credentials: "include"}
            );
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
            console.log(auditoriumId);
            const response = await fetch(`http://localhost:3300/auditoriumsParts?auditoriumId=${auditoriumId}`,
                {credentials: "include"}
            );
            const newMap = await response.json();
            console.log(newMap);
            setMap(newMap);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching auditorium parts:", error);
            setLoading(false);
        }
    };

    const handleClick = (part) => {
        setPartId(part.partId);
        // setBlocksOfPart(map[partId].numOfRowsAndSeats)
        setPartName(part.partName);
        setSeatsVisible(true);
    };

    const handleBackToMap = () => {
        setSeatsVisible(false);
        setPartId(null);
        setPartName(null);
    };

    const getPolygonCenter = (coords) => {
        const points = coords.split(" ").map(point => {
            const [x, y] = point.split(",").map(Number);
            return {
                x: (x / 600) * 600, // Adjust X coordinate for 600x600 scale
                y: (y / 600) * 600  // Adjust Y coordinate for 600x600 scale
            };
        });
    
        // Calculate average X and Y coordinates for the center
        const centerX = points.reduce((sum, point) => sum + point.x, 0) / points.length;
        const centerY = points.reduce((sum, point) => sum + point.y, 0) / points.length;
    
        return { x: centerX, y: centerY };
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
                        {map.map((part, index) => (
                            <g key={part.partId || index} onClick={() => handleClick(part)}>
                                {part.coords ? (
                                    <polygon
                                        points={part.coords}
                                        fill="black"
                                        className="auditorium-part"
                                    />
                                ) : (
                                    <rect
                                        x={(index % 2) * 100 + 100}  // Adjust x position dynamically based on index
                                        y={Math.floor(index / 2) * 100 + 30}  // Adjust y position dynamically based on index
                                        width="50"
                                        height="50"
                                        fill={(index + Math.floor(index / 2)) % 2 === 0 ? "gray" : "lightgray"}  // Alternate colors like a chessboard
                                        className="auditorium-part"
                                    />
                                )}
                                <text
                                    x={part.coords ? getPolygonCenter(part.coords).x : (index % 2) * 100 + 125}  // Adjust x position for text
                                    y={part.coords ? getPolygonCenter(part.coords).y : Math.floor(index / 2) * 100 + 55}  // Adjust y position for text
                                    textAnchor="middle"
                                    fill="white"
                                    fontSize="12"
                                    className='textMap'
                                >
                                    {part.partName || 'Empty Part'}
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
