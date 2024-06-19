
import React, { useEffect , useState} from 'react';
import { useParams } from "react-router-dom";
import '../css/Seats.css'; 

function Seats({partId}) {
    const { id } = useParams();
    const [seats, setSeats]=useState([]);
    useEffect(() => {
        if (id && partId) {
          console.log("react : eventid " + id + "partId "+ partId);
            fetch(`http://localhost:3300/events/${id}/seatsView?partId=${partId}`)
                .then((res) => res.json())
                .then((newSeats) => {
                  setSeats(newSeats);
                });
        }
    }, []);
 
  return (
    <div>{seats.map((seat) => (
      <div key={seat.id}>
          <label>
              <input className='seats' text={seat.seatNumber} type="checkbox" value={seat.id} />
          </label>
      </div>
  ))}</div>
  )
}

export default Seats