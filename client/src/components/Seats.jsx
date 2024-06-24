// import React, { useContext, useEffect, useState, useRef } from "react";
// import { useParams } from "react-router-dom";
// import "../css/Seats.css";
// import PersonalInformation from "./PersonalInformation";
// import { EventContext } from "../components/App";
// import html2canvas from 'html2canvas';

// function Seats({ partId, partName, onBackToMap }) {
//   const { id } = useParams();
//   const [showTooltip, setShowTooltip] = useState(false);
//   const [showPersonalInformation, setShowPersonalInformation] = useState(false);
//   const { selectedEvent } = useContext(EventContext);
//   const [seats, setSeats] = useState([]);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [purchaseMade, setPurchaseMade] = useState(false);
//   const [timeouts, setTimeouts] = useState({});
//   const [mySeats, setMySeats] = useState([]);
//   const [timer, setTimer] = useState(600); // 10 minutes timer in seconds
//   const intervalRef = useRef(null);

//   useEffect(() => {
//     if (id && partId) {
//       fetch(`http://localhost:3300/events/${id}/seatsView?partId=${partId}`)
//         .then((res) => res.json())
//         .then((newSeats) => {
//           setSeats(newSeats);
//           setSelectedSeats(newSeats);
//         });
//     }
//   }, [id, partId]);

//   useEffect(() => {
//     if (timer === 0) {
//       clearInterval(intervalRef.current);
//       setSelectedSeats(prevSelectedSeats =>
//         prevSelectedSeats.map(seat => ({
//           ...seat,
//           seatIsTaken: false
//         }))
//       );
//       setMySeats([]);
//     }
//   }, [timer]);

//   useEffect(() => {
//     return () => clearInterval(intervalRef.current);
//   }, []);

//   const groupedSeats = selectedSeats.reduce((acc, seat) => {
//     if (!acc[seat.rowNumber]) {
//       acc[seat.rowNumber] = [];
//     }
//     acc[seat.rowNumber].push(seat);
//     return acc;
//   }, {});

//   const captureScreenshot = () => {
//     html2canvas(document.body).then(canvas => {
//       const link = document.createElement('a');
//       link.download = 'screenshot.png';
//       link.href = canvas.toDataURL();
//       link.click();
//     });
//   };

//   const handleSeatChosen = (seatId) => {
//     setSelectedSeats((prevSelectedSeats) => {
//       return prevSelectedSeats.map((selectedSeat) => {
//         if (selectedSeat.seatId === seatId) {
//           if (selectedSeat.seatIsTaken) {
//             clearTimeout(timeouts[seatId]);
//             const newTimeouts = { ...timeouts };
//             delete newTimeouts[seatId];
//             setTimeouts(newTimeouts);
//             setMySeats((prevMySeats) => prevMySeats.filter((s) => s.seatId !== seatId));
//             return { ...selectedSeat, seatIsTaken: false };
//           } else {
//             const timeout = setTimeout(() => {
//               setSelectedSeats((prevSelectedSeats) => {
//                 return prevSelectedSeats.map((s) => {
//                   if (s.seatId === seatId) {
//                     return { ...s, seatIsTaken: false };
//                   }
//                   return s;
//                 });
//               });
//               setMySeats((prevMySeats) => prevMySeats.filter((s) => s.seatId !== seatId));
//               const newTimeouts = { ...timeouts };
//               delete newTimeouts[seatId];
//               setTimeouts(newTimeouts);
//             }, 10 * 60 * 1000); // 10 minutes timeout

//             setTimeouts((prevTimeouts) => ({
//               ...prevTimeouts,
//               [seatId]: timeout,
//             }));

//             setMySeats((prevMySeats) => {
//               if (prevMySeats.some((s) => s.seatId === seatId)) {
//                 return prevMySeats;
//               } else {
//                 return [...prevMySeats, selectedSeat];
//               }
//             });

//             // הגדרת הטיימר רק אם הוא לא מוגדר
//             if (intervalRef.current === null) {
//               intervalRef.current = setInterval(() => {
//                 setTimer((prevTimer) => prevTimer - 1);
//               }, 1000);
//             }

//             return { ...selectedSeat, seatIsTaken: true };
//           }
//         }
//         return selectedSeat;
//       });
//     });
//   };

//   const handleMouseOver = () => {
//     setShowTooltip(true);
//   };

//   const handleMouseOut = () => {
//     setShowTooltip(false);
//   };

//   const handleContinue = () => {
//     setShowPersonalInformation(true);
//     captureScreenshot();
//   };

//   const handlePayment = () => {
//     setPurchaseMade(true);
//     setSeats(selectedSeats);
//     Object.values(timeouts).forEach(clearTimeout);
//     setTimeouts({});
//     clearInterval(intervalRef.current);
//   };

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
//   };

//   return (
//     <div>
//       {!showPersonalInformation && (
//         <div>
//           <h2>
//             Take a seat in {selectedEvent.auditoriumName} | {partName}
//           </h2>
//           {/* Conditional rendering of the timer */}
//           {mySeats.length > 0 && (
//             <div className="timer-circle">
//               {formatTime(timer)}
//             </div>
//           )}

//           <div className="seats-container">
//             {Array.isArray(selectedSeats) &&
//               Object.keys(groupedSeats).map((rowNumber) => (
//                 <div key={rowNumber} className="seat-row">
//                   {groupedSeats[rowNumber].map((seat) => (
//                     <div
//                       key={seat.seatId}
//                       className={`seat-item ${
//                         !seat.seatIsVisible ? "invisible-seat" : ""
//                       }`}
//                     >
//                       {seat.seatIsVisible && (
//                         <button
//                           onClick={() => {
//                             if (seat.seatIsTaken && !mySeats.some((s) => s.seatId === seat.seatId)) {
//                               return;
//                             }
//                             handleSeatChosen(seat.seatId);
//                           }}
//                           key={seat.seatId}
//                           className="btnSeats"
//                           style={{
//                             backgroundColor: seat.seatIsTaken
//                               ? mySeats.some((s) => s.seatId === seat.seatId)
//                                 ? "lightblue"
//                                 : "lightgrey"
//                               : "initial",
//                             color: seat.seatIsTaken ? "white" : "initial",
//                             cursor: seat.seatIsTaken && !mySeats.some((s) => s.seatId === seat.seatId)
//                               ? "not-allowed"
//                               : "pointer",
//                           }}
//                         >
//                           {seat.seatIsTaken ? "X" : seat.seatNumber}
//                         </button>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               ))}
//           </div>
//           <div className="back-button-container">
//             <button
//               className="back-button"
//               onClick={onBackToMap}
//               onMouseOver={handleMouseOver}
//               onMouseOut={handleMouseOut}
//             >
//               ⇦
//             </button>
//             {showTooltip && (
//               <div className="back-button-tooltip">blocks map</div>
//             )}
//           </div>

//           <button className="continue-button" onClick={handleContinue}>
//             CONTINUE
//           </button>
//         </div>
//       )}
//       {showPersonalInformation && <PersonalInformation mySeats={mySeats} timer={timer} />}
//     </div>
//   );
// }

// export default Seats;

import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "../css/Seats.css";
import PersonalInformation from "./PersonalInformation";
import { EventContext } from "../components/App";
import html2canvas from 'html2canvas';

function Seats({ partId, partName, onBackToMap }) {
  const { id } = useParams();
  const [showTooltip, setShowTooltip] = useState(false);
  const [showPersonalInformation, setShowPersonalInformation] = useState(false);
  const { selectedEvent } = useContext(EventContext);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [purchaseMade, setPurchaseMade] = useState(false);
  const [timeouts, setTimeouts] = useState({});
  const [mySeats, setMySeats] = useState([]);
  const [timer, setTimer] = useState(600); // 10 minutes timer in seconds
  const intervalRef = useRef(null);

  useEffect(() => {
    if (id && partId) {
      fetch(`http://localhost:3300/events/${id}/seatsView?partId=${partId}`)
        .then((res) => res.json())
        .then((newSeats) => {
          setSeats(newSeats);
          setSelectedSeats(newSeats);
        });
    }
  }, [id, partId]);

  useEffect(() => {
    if (timer === 0) {
      clearInterval(intervalRef.current);
      setSelectedSeats(prevSelectedSeats =>
        prevSelectedSeats.map(seat => ({
          ...seat,
          seatIsTaken: false
        }))
      );
      setMySeats([]);
    }
  }, [timer]);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const groupedSeats = selectedSeats.reduce((acc, seat) => {
    if (!acc[seat.rowNumber]) {
      acc[seat.rowNumber] = [];
    }
    acc[seat.rowNumber].push(seat);
    return acc;
  }, {});

  const captureScreenshot = () => {
    const element = document.getElementById('center-element'); // ודא שיש לך אלמנט עם ID כזה במרכז המסך
    html2canvas(element).then(canvas => {
      const screenshot = canvas.toDataURL();
      localStorage.setItem('screenshot', screenshot);
    });
  };

  const handleSeatChosen = (seatId) => {
    setSelectedSeats((prevSelectedSeats) => {
      return prevSelectedSeats.map((selectedSeat) => {
        if (selectedSeat.seatId === seatId) {
          if (selectedSeat.seatIsTaken) {
            clearTimeout(timeouts[seatId]);
            const newTimeouts = { ...timeouts };
            delete newTimeouts[seatId];
            setTimeouts(newTimeouts);
            setMySeats((prevMySeats) => prevMySeats.filter((s) => s.seatId !== seatId));
            return { ...selectedSeat, seatIsTaken: false };
          } else {
            const timeout = setTimeout(() => {
              setSelectedSeats((prevSelectedSeats) => {
                return prevSelectedSeats.map((s) => {
                  if (s.seatId === seatId) {
                    return { ...s, seatIsTaken: false };
                  }
                  return s;
                });
              });
              setMySeats((prevMySeats) => prevMySeats.filter((s) => s.seatId !== seatId));
              const newTimeouts = { ...timeouts };
              delete newTimeouts[seatId];
              setTimeouts(newTimeouts);
            }, 10 * 60 * 1000); // 10 minutes timeout

            setTimeouts((prevTimeouts) => ({
              ...prevTimeouts,
              [seatId]: timeout,
            }));

            setMySeats((prevMySeats) => {
              if (prevMySeats.some((s) => s.seatId === seatId)) {
                return prevMySeats;
              } else {
                return [...prevMySeats, selectedSeat];
              }
            });

            // הגדרת הטיימר רק אם הוא לא מוגדר
            if (intervalRef.current === null) {
              intervalRef.current = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
              }, 1000);
            }

            return { ...selectedSeat, seatIsTaken: true };
          }
        }
        return selectedSeat;
      });
    });
  };

  const handleMouseOver = () => {
    setShowTooltip(true);
  };

  const handleMouseOut = () => {
    setShowTooltip(false);
  };

  const handleContinue = () => {
    setShowPersonalInformation(true);
    captureScreenshot();
  };

  const handlePayment = () => {
    setPurchaseMade(true);
    setSeats(selectedSeats);
    Object.values(timeouts).forEach(clearTimeout);
    setTimeouts({});
    clearInterval(intervalRef.current);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div>
      {!showPersonalInformation && (
        <div>
          <h2>
            Take a seat in {selectedEvent.auditoriumName} | {partName}
          </h2>
          {/* Conditional rendering of the timer */}
          {mySeats.length > 0 && (
            <div className="timer-circle">
              {formatTime(timer)}
            </div>
          )}

          <div className="seats-container" id="center-element">
            {Array.isArray(selectedSeats) &&
              Object.keys(groupedSeats).map((rowNumber) => (
                <div key={rowNumber} className="seat-row">
                  {groupedSeats[rowNumber].map((seat) => (
                    <div
                      key={seat.seatId}
                      className={`seat-item ${
                        !seat.seatIsVisible ? "invisible-seat" : ""
                      }`}
                    >
                      {seat.seatIsVisible && (
                        <button
                          onClick={() => {
                            if (seat.seatIsTaken && !mySeats.some((s) => s.seatId === seat.seatId)) {
                              return;
                            }
                            handleSeatChosen(seat.seatId);
                          }}
                          key={seat.seatId}
                          className="btnSeats"
                          style={{
                            backgroundColor: seat.seatIsTaken
                              ? mySeats.some((s) => s.seatId === seat.seatId)
                                ? "lightblue"
                                : "lightgrey"
                              : "initial",
                            color: seat.seatIsTaken ? "white" : "initial",
                            cursor: seat.seatIsTaken && !mySeats.some((s) => s.seatId === seat.seatId)
                              ? "not-allowed"
                              : "pointer",
                          }}
                        >
                          {seat.seatIsTaken ? "X" : seat.seatNumber}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ))}
          </div>
          <div className="back-button-container">
            <button
              className="back-button"
              onClick={onBackToMap}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              ⇦
            </button>
            {showTooltip && (
              <div className="back-button-tooltip">blocks map</div>
            )}
          </div>

          <button className="continue-button" onClick={handleContinue}>
            CONTINUE
          </button>
        </div>
      )}
      {showPersonalInformation && <PersonalInformation mySeats={mySeats} timer={timer} />}
    </div>
  );
}

export default Seats;

