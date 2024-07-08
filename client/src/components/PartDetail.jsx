import React, { useState, useEffect } from 'react';
import '../css/PartDetail.css'; // Import the CSS file
import { MdSaveAs } from "react-icons/md";

const PartDetail = ({ parts, index, setOpenPartsDetails, onSave }) => {
  const [partName, setPartName] = useState('');
  const [matrixRows, setMatrixRows] = useState(1);
  const [matrixCols, setMatrixCols] = useState(1);
  const [matrix, setMatrix] = useState([[true]]);

  useEffect(() => {
    if (parts[index]) {
      setPartName(parts[index].title || '');
      setMatrix(parts[index].matrix || [[true]]);
      setMatrixRows(parts[index].matrix.length || 1);
      setMatrixCols(parts[index].matrix[0]?.length || 1);
    }
  }, [index, parts]);

  const handleNameChange = (e) => {
    setPartName(e.target.value);
  };

  const handleRowsChange = (e) => {
    const rows = parseInt(e.target.value, 10);
    const newMatrix = [...matrix];

    if (rows > matrixRows) {
      for (let i = matrixRows; i < rows; i++) {
        newMatrix.push(Array(matrixCols).fill(true));
      }
    } else {
      newMatrix.length = rows;
    }

    setMatrixRows(rows);
    setMatrix(newMatrix);
  };

  const handleColsChange = (e) => {
    const cols = parseInt(e.target.value, 10);
    const newMatrix = matrix.map(row => {
      if (cols > matrixCols) {
        return [...row, ...Array(cols - matrixCols).fill(true)];
      } else {
        return row.slice(0, cols);
      }
    });

    setMatrixCols(cols);
    setMatrix(newMatrix);
  };

  const toggleButtonState = (row, col) => {
    const newMatrix = matrix.map((rowData, rowIndex) => {
      if (rowIndex === row) {
        return rowData.map((colData, colIndex) => (colIndex === col ? !colData : colData));
      }
      return rowData;
    });
    setMatrix(newMatrix);
  };

  const handleMouseEnter = (row, col) => {
    const newMatrix = matrix.map((rowData, rowIndex) => {
      if (rowIndex === row) {
        return rowData.map((colData, colIndex) => (colIndex === col ? false : colData));
      }
      return rowData;
    });
    setMatrix(newMatrix);
  };

  const handleSave = () => {
    const partData = {
      title: partName,
      matrix: matrix,
    };
    onSave(index, partData);
    setOpenPartsDetails(false);
  };

  return (
    <div className="part-detail-container">
      <h1>Part {index + 1}</h1>
      <label>
        Part Name:
        <input type="text" value={partName} onChange={handleNameChange} />
      </label>
      <div className="matrix-inputs">
        <label>
          Rows:
          <input type="number" value={matrixRows} min="1" onChange={handleRowsChange} disabled={!partName} />
        </label>
        <label>
          Columns:
          <input type="number" value={matrixCols} min="1" onChange={handleColsChange} disabled={!partName} />
        </label>
      </div>
      <div className="matrix-navigation">
        <div className="matrix-container">
          {matrix.map((row, rowIndex) => (
            <div key={rowIndex} className="matrix-row">
              {row.map((col, colIndex) => (
                <button
                  key={colIndex}
                  className={`matrix-button ${col ? 'pressed' : ''}`}
                  onClick={() => toggleButtonState(rowIndex, colIndex)}
                  onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                >
                </button>
              ))}
            </div>
          ))}
        </div>
        <MdSaveAs onClick={handleSave} />
      </div>
    </div>
  );
};

export default PartDetail;
