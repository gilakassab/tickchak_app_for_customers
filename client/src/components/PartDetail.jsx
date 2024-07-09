import React, { useState, useEffect, useRef } from 'react';
import '../css/PartDetail.css'; // Import the CSS file
import { MdSaveAs } from "react-icons/md";

const PartDetail = ({ parts, index, setOpenPartsDetails, onSave }) => {
  const [partName, setPartName] = useState('');
  const [matrixRows, setMatrixRows] = useState(1);
  const [matrixCols, setMatrixCols] = useState(1);
  const [matrix, setMatrix] = useState([[true]]);
  const [edgePoints, setEdgePoints] = useState('');
  const matrixContainerRef = useRef(null);

  useEffect(() => {
    if (parts[index]) {
      setPartName(parts[index].title || '');
      setMatrix(parts[index].matrix || [[true]]);
      setMatrixRows(parts[index].matrix.length || 1);
      setMatrixCols(parts[index].matrix[0]?.length || 1);
      setEdgePoints(parts[index].edgePoints || '');
    }
  }, [index, parts]);

  useEffect(() => {
    updateEdgePoints(matrix);
  }, [matrix]);

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

  const updateEdgePoints = (matrix) => {
    const points = [];
    const containerRect = matrixContainerRef.current.getBoundingClientRect();
    const buttonSize = containerRect.width / matrixCols;

    const scaleX = 200 / containerRect.width;
    const scaleY = 200 / containerRect.height;

    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        if (matrix[row][col]) {
          const x = Math.round((col * buttonSize + containerRect.left) * scaleX);
          const y = Math.round((row * buttonSize + containerRect.top) * scaleY);
          points.push({ x, y });
        }
      }
    }

    // Add edge points for the corners of the matrix
    const corners = [
      { x: 0, y: 0 },
      { x: 0, y: 1000 },
      { x: 100, y: 0 },
      { x: 100, y: 1000 }
    ];
    points.push(...corners);

    // Filter points to remove close duplicates
    const filteredPoints = points.filter((point, index) => {
      const nextPoint = points[index + 1];
      return !nextPoint || (Math.abs(point.x - nextPoint.x) > 1 && Math.abs(point.y - nextPoint.y) > 1);
    });

    const edgePointsString = filteredPoints.map(point => `${point.x},${point.y}`).join(' ');
    setEdgePoints(edgePointsString);
  };

  const handleSave = () => {
    const partData = {
      title: partName,
      matrix: matrix,
      edgePoints: edgePoints,
    }
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
      <div className="matrix-navigation" style={{ width: '400px', height: '200px' }} ref={matrixContainerRef}>
        <div className="matrix-container" style={{ width: '100%', height: '100%' }}>
          {matrix.map((row, rowIndex) => (
            <div key={rowIndex} className="matrix-row" style={{ display: 'flex' }}>
              {row.map((col, colIndex) => (
                <button
                  key={colIndex}
                  className={`matrix-button ${col ? 'pressed' : ''}`}
                  onClick={() => toggleButtonState(rowIndex, colIndex)}
                  onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                  style={{
                    flex: '1 0 auto',
                    backgroundColor: col ? 'pink' : 'gray',
                    border: '1px solid black',
                    outline: 'none',
                  }}
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