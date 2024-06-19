
import React, { useEffect , useState} from 'react';
import { useParams } from "react-router-dom";
import '../css/Seats.css'; 

function Seats({partId}) {
    const { id } = useParams();
    const [seats, setSeats]=useState([]);
    useEffect(() => {
        if (partId) {
            fetch(`http://localhost:3300/seatsView?eventId=${id}&partId=${partId}`)
                .then((res) => res.json())
                .then((newSeats) => {
                  setSeats(newSeats);
                });
        }
    }, [partId]);
 console.log(seats);
  return (
    <div>{seats.map((seat) => (
      <div key={seat.id}>
          <label>
              <input className='seats' type="checkbox" value={seat.id} />
          </label>
      </div>
  ))}</div>
  )
}

export default Seats