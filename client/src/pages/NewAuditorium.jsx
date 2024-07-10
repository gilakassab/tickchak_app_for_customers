import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PartDetail from '../components/PartDetail';
import '../css/NewAuditorium.css';

const NewAuditorium = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const [numParts, setNumParts] = useState(1);
  const [parts, setParts] = useState([{ title: '', matrix: [[true]] }]);
  const [openPartsDetails, setOpenPartsDetails] = useState(false);
  const [selectedPart, setSelectedPart] = useState(null);

  const handleNumPartsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumParts(value);
    const newParts = [...parts];

    if (value > numParts) {
      for (let i = numParts; i < value; i++) {
        newParts.push({ title: '', matrix: [[true]] });
      }
    } else {
      newParts.length = value;
    }

    setParts(newParts);
  };

  const handlePartClick = (index) => {
    setSelectedPart(index);
    setOpenPartsDetails(true);
  };

  const handleSavePartDetail = (index, partData) => {
    const updatedParts = [...parts];
    updatedParts[index] = partData;
    setParts(updatedParts);
    setOpenPartsDetails(false);
  };

  const handleSaveAllParts = async () => {
    try {
      const response = await fetch(
        `http://localhost:3300/auditoriums/${name}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ parts: parts }),
          credentials: "include"
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update event");
      }

      const data = await response.json();
      navigate('/tickchak/adminhome');
    } catch (error) {
     alert("Error updating event:", error);
    }
  };

  const allPartsFilled = parts.every(part => part.title && part.matrix.length && part.matrix[0].length);

  return (
    <div className="new-auditorium-container">
      {!openPartsDetails ? (
        <>
          <h1>{name}</h1>
          <label>
            Number of Parts:
            <input
              type="number"
              value={numParts}
              min="1"
              onChange={handleNumPartsChange}
            />
          </label>
          <div className="parts-container">
            {parts.map((part, index) => (
              <div
                key={index}
                className="part-box"
                onClick={() => handlePartClick(index)}
              >
                <h2>{part.title || `${index + 1}`}</h2>
              </div>
            ))}
          </div>
          <button onClick={handleSaveAllParts} disabled={!allPartsFilled}>
            Save All Parts
          </button>
        </>
      ) : (
        <PartDetail
          parts={parts}
          index={selectedPart}
          setOpenPartsDetails={setOpenPartsDetails}
          onSave={handleSavePartDetail}
        />
      )}
    </div>
  );
};

export default NewAuditorium;
