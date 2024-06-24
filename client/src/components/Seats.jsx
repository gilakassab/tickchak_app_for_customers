import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/Seats.css";
import PersonalInformation from "./PersonalInformation";
import { EventContext } from "../components/App";
import html2canvas from 'html2canvas';
import JsBarcode from 'jsbarcode';

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

  const captureScreenshot = async () => {
    const canvas = await html2canvas(document.body);
    const screenshot = canvas.toDataURL("image/png");

    // יצירת הברקוד
    const barcodeCanvas = document.createElement("canvas");
    JsBarcode(barcodeCanvas, `Event: ${id}`, { format: "CODE128" });
    const barcodeDataUrl = barcodeCanvas.toDataURL("image/png");

    // הוספת הברקוד לתמונה
    const finalCanvas = document.createElement("canvas");
    finalCanvas.width = canvas.width;
    finalCanvas.height = canvas.height + barcodeCanvas.height;
    const ctx = finalCanvas.getContext("2d");
    ctx.drawImage(canvas, 0, 0);
    ctx.drawImage(barcodeCanvas, 0, canvas.height);

    const finalImage = finalCanvas.toDataURL("image/png");
    localStorage.setItem("screenshot", finalImage);
    return finalImage;
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

  const handleContinue = async () => {
    setShowPersonalInformation(true);
    const screenshot = await captureScreenshot();
  };

  const handlePayment = () => {
    setPurchaseMade(true);
    setSeats(selectedSeats);
    Object.values(timeouts).forEach(clearTimeout);
    setTimeouts({});
  };

  // פונקציה לסידור המושבים לפי שורות
  const groupSeatsByRows = (seats) => {
    return seats.reduce((acc, seat) => {
      if (!acc[seat.rowNumber]) {
        acc[seat.rowNumber] = [];
      }
      acc[seat.rowNumber].push(seat);
      return acc;
    }, {});
  };

  const groupedSeats = groupSeatsByRows(selectedSeats);

  return (
    <div>
      {!showPersonalInformation && (
        <div>
          <h2>
            Take a seat in {selectedEvent.auditoriumName} | {partName}
          </h2>
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
          <div className="seats-container">
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
                            handleSeatChosen(seat.seatId);
                          }}
                          key={seat.seatId}
                          className="btnSeats"
                          style={{
                            backgroundColor: seat.seatIsTaken
                              ? "grey"
                              : "initial",
                            color: seat.seatIsTaken ? "white" : "initial",
                            cursor: seat.seatIsTaken
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

          <button className="continue-button" onClick={handleContinue}>
            CONTINUE
          </button>
        </div>
      )}
      {showPersonalInformation && <PersonalInformation mySeats={mySeats} />}
    </div>
  );
}

export default Seats;
