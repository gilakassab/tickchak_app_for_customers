import React, { useContext, useState, useEffect } from 'react';
import { EventContext } from './App';

function AuditoriumMap() {
    const { selectedEvent } = useContext(EventContext);
    const [map, setMap] = useState([]);

    useEffect(() => {
      console.log("auditoriumId");
      console.log(selectedEvent.auditoriumId);
        fetch(`http://localhost:3300/auditoriumsParts?auditoriumId=${selectedEvent.auditoriumId}`)
            .then((res) => res.json())
            .then((newMap) => {
                setMap(newMap);
            });
    }, []);
  console.log(map);
    return (
        <div>
            {map.map((part, index) => (
                <button key={index}>
                    {part.nameOfPart} {/* assuming each part has a name property */}
                </button>
            ))}
        </div>
    );
}

export default AuditoriumMap;
