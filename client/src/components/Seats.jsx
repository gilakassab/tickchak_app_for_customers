
import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";

function Seats({partId}) {
    const { id } = useParams();
    useEffect(() => {
        if (partId) {
            fetch(`http://localhost:3300/seatsView?eventId=${id}partId=${partId}`)
                .then((res) => res.json())
                .then((newMap) => {
                    setMap(newMap);
                });
        }
    }, [partId]);

  return (
    <div>Seats</div>
  )
}

export default Seats