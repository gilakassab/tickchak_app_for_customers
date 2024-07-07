import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';


function NewAuditorium() {
  const { auditoriumName } = useParams();
  const [numParts, setNumParts] = useState(1);
  const [parts, setParts] = useState([{ title: '', image: '' }]);

  const handleNumPartsChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setNumParts(count);

    const newParts = [...parts];
    while (newParts.length < count) {
      newParts.push({ title: '', image: '' });
    }
    setParts(newParts.slice(0, count));
  };

  const handlePartChange = (index, field, value) => {
    const newParts = parts.map((part, i) =>
      i === index ? { ...part, [field]: value } : part
    );
    setParts(newParts);
  };

  return (
    <div>
      <h1>{auditoriumName}</h1>
      <label>
        Number of Parts:
        <input
          type="number"
          value={numParts}
          min="1"
          onChange={handleNumPartsChange}
        />
      </label>
      {parts.map((part, index) => (
        <div key={index}>
          <h2>Part {index + 1}</h2>
          <label>
            Title:
            <input
              type="text"
              value={part.title}
              onChange={(e) => handlePartChange(index, 'title', e.target.value)}
            />
          </label>
          <div>
          <img src="../images/rows-red-seats-theater.jpg" />
        </div>
          {/* <div>
            <Link to={`/auditorium/${auditoriumName}/part/${index + 1}`}>
              Go to Part {index + 1}
            </Link>
          </div> */}
        </div>
      ))}
    </div>
  );
}

export default NewAuditorium;