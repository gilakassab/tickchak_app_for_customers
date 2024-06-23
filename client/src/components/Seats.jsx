import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/Seats.css";
import PersonalInformation from "./PersonalInformation";
import { EventContext } from "../components/App";

function Seats({ partId, partName, onBackToMap, blocksOfPart }) {
  const { id } = useParams();

  const { selectedEvent } = useContext(EventContext);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showPersonalInformation, setShowPersonalInformation] = useState(false);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [purchaseMade, setPurchaseMade] = useState(false);
  const [timeouts, setTimeouts] = useState({}); // State to keep track of timeouts
  const [mySeats, setMySeats] = useState([]);
  const [blocks, setBlocks] = useState([]); // State for seat blocks

  useEffect(() => {
    if (id && partId) {
      fetch(`http://localhost:3300/events/${id}/seatsView?partId=${partId}`)
        .then((res) => res.json())
        .then((newSeats) => {
          setSeats(newSeats);
          setSelectedSeats(newSeats);
         
          // Parse blocks data (replace 'numOfRowsAndSeats' with the actual field name from the data)
          console.log(blocksOfPart)
          const blocksData = parseBlocks(blocksOfPart);
          
          setBlocks(blocksData);
        });
    }
  }, [id, partId]);

  // Group seats by rowNumber
  const groupedSeats = selectedSeats.reduce((acc, seat) => {
    if (!acc[seat.rowNumber]) {
      acc[seat.rowNumber] = [];
    }
    acc[seat.rowNumber].push(seat);
    return acc;
  }, {});
  console.log('groupedSeats', groupedSeats);

  const handleSeatChosen = (seatId) => {
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.map((selectedSeat) => {
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
              setSelectedSeats((prevSelectedSeats) =>
                prevSelectedSeats.map((s) => {
                  if (s.seatId === seatId) {
                    return { ...s, seatIsTaken: false };
                  }
                  return s;
                })
              );
              setMySeats((prevMySeats) => prevMySeats.filter((s) => s.seatId !== seatId));
              const newTimeouts = { ...timeouts };
              delete newTimeouts[seatId];
              setTimeouts(newTimeouts);
            }, 10 * 60 * 1000); // 10 minutes timeout

            setTimeouts((prevTimeouts) => ({
              ...prevTimeouts,
              [seatId]: timeout,
            }));

            setMySeats((prevMySeats) => [...prevMySeats, selectedSeat]);
            return { ...selectedSeat, seatIsTaken: true };
          }
        }
        return selectedSeat;
      })
    );
  };

  const handleMouseOver = () => {
    setShowTooltip(true);
  };

  const handleMouseOut = () => {
    setShowTooltip(false);
  };

  const handleContinue = () => {
    setShowPersonalInformation(true);
  };

  const handlePayment = () => {
    setPurchaseMade(true);
    setSeats(selectedSeats);
    Object.values(timeouts).forEach(clearTimeout); // Clear all timeouts
    setTimeouts({});
  };

  // Function to parse blocks data
  const parseBlocks = (blockString) => {
    return blockString.split('-').map(block => {
      const [rows, seatsPerRow] = block.split(',').map(Number);
      return { rows, seatsPerRow };
    });
  };

const handleGroupedBlocks = (rowIndex,seatIndex,blockIndex) =>{

}
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
              blocks.map((block, blockIndex) => (
                <div key={blockIndex} className="seat-block">
                  {Array.from({ length: block.rows }, (_, rowIndex) => (
                    <div key={rowIndex} className="seat-row">
                      {Array.from({ length: block.seatsPerRow }, (_, seatIndex) => {
                        const groupedBlocks = handleGroupedBlocks[rowIndex,seatIndex,blockIndex];
                        const seat = groupedSeats[rowIndex] && groupedSeats[rowIndex][seatIndex];
                        return (
                          <div
                            key={seat ? seat.seatId : `empty-${seatIndex}`}
                            className={`seat-item ${seat && !seat.seatIsVisible ? "invisible-seat" : ""}`}
                          >
                            {seat && seat.seatIsVisible && (
                              <button
                                onClick={() => {
                                  handleSeatChosen(seat.seatId);
                                }}
                                className="btnSeats"
                                style={{
                                  backgroundColor: seat.seatIsTaken ? "grey" : "initial",
                                  color: seat.seatIsTaken ? "white" : "initial",
                                  cursor: seat.seatIsTaken ? "not-allowed" : "pointer",
                                }}
                              >
                                {seat.seatIsTaken ? "X" : seat.seatNumber}
                              </button>
                            )}
                          </div>
                        );
                      })}
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
