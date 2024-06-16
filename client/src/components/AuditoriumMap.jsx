import React, { useState } from 'react'
import { EventContext } from './App';

function AuditoriumMap() {

    const { selectedEvent } = useContext(EventContext);
    const {map,setMap}=useState([]);

    fetch(`http://localhost:3300/auditoriumsParts?auditoriumId=${selectedEvent.auditoriumId}`)
    .then((res) => res.json())
    .then((newMap) => {
      setMap(newMap);
    }
    )

  return (
    <div>AuditoriumMap</div>
  )
}

export default AuditoriumMap