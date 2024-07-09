import React, { useState } from "react";
import ReactImageAnnotation from "react-image-annotation";

const ImageAnnotation = ({ image, onSaveAnnotation }) => {
  const file = image;
  const url = URL.createObjectURL(file);
  const [annotations, setAnnotations] = useState([]);
  const [drawing, setDrawing] = useState(false); // State to track drawing mode

  const onChange = (annotation) => {
    // Handle annotation change if needed
  };

  const onSubmit = () => {
    if (annotations.length > 0 && drawing) {
      // Finalize annotation on submit
      const lastAnnotation = annotations[annotations.length - 1];
      setAnnotations([...annotations.slice(0, annotations.length - 1), lastAnnotation.data]);
      onSaveAnnotation([...annotations, lastAnnotation.data]);
      setDrawing(false);
    }
  };

  const handleMouseDown = (event) => {
    if (!drawing) {
      setDrawing(true);
      const { clientX, clientY } = event;
      const rect = event.target.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const newAnnotation = {
        geometry: {
          type: "point",
          x,
          y,
          width: 0,
          height: 0,
        },
        data: {},
      };

      setAnnotations([...annotations, newAnnotation]);
    }
  };

  const handleMouseMove = (event) => {
    if (drawing) {
      const { clientX, clientY } = event;
      const rect = event.target.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const updatedAnnotation = {
        ...annotations[annotations.length - 1],
        geometry: {
          ...annotations[annotations.length - 1].geometry,
          width: x - annotations[annotations.length - 1].geometry.x,
          height: y - annotations[annotations.length - 1].geometry.y,
        },
      };

      const updatedAnnotations = [
        ...annotations.slice(0, annotations.length - 1),
        updatedAnnotation,
      ];

      setAnnotations(updatedAnnotations);
    }
  };

  const handleMouseUp = () => {
    // Finalize drawing on mouse up
    setDrawing(false);
  };

  return (
    <ReactImageAnnotation
      src={url}
      alt="Annotatable image"
      annotations={annotations}
      type="point"
      value={{}}
      onChange={onChange}
      onSubmit={onSubmit}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      renderEditor={({ geometry, data, onChange, onSubmit }) => (
        <div>
          <input
            type="text"
            placeholder="Annotation data"
            value={data ? data.text : ""}
            onChange={(e) => onChange({ ...data, text: e.target.value })}
          />
          <button onClick={onSubmit}>Save</button>
        </div>
      )}
      renderHighlight={({ annotation }) => (
        <div
          style={{
            position: "absolute",
            left: annotation.geometry.x,
            top: annotation.geometry.y,
            width: annotation.geometry.width,
            height: annotation.geometry.height,
            border: "2px solid red",
            pointerEvents: "none",
          }}
        />
      )}
    />
  );
};

export default ImageAnnotation;
