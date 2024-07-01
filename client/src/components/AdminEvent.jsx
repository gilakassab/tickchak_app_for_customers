import React from "react";
import moment from "moment";
import "../css/AdminEvent.css"; // Create and import a new CSS file for AdminEvent styles

function AdminEvent({
  eventToShow,
  setOpenSingleEvent,
  auditoriums,
  onSaveEvent,
}) {
  const handleClickBtnSave = async () => {
    const auditoriumExists = auditoriums.some(
      (auditorium) => auditorium.auditoriumId === eventToShow.auditoriumId
    );
    if (auditoriumExists) {
      try {
        const response = await fetch(
          `http://localhost:3300/events/${eventToShow.eventId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ eventIsAllowed: "TRUE" }),
            credentials: "include"
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update event");
        }

        onSaveEvent(eventToShow);

        setOpenSingleEvent(false);
      } catch (error) {
        console.error("Error updating event:", error);
      }
    } else {
      alert("Cannot save because the auditorium doesn't exist.");
      setOpenSingleEvent(false);
    }
  };

  const handleClickBtnDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3300/events/${eventToShow.eventId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include"
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      setOpenSingleEvent(false);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="admin-event-overlay">
      <div className="admin-event">
        <h2>Event Details</h2>
        <form className="event-details-form">
          <div className="form-group">
            <label>Event Name:</label>
            <input type="text" value={eventToShow.eventName} readOnly />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input
              type="text"
              value={moment(eventToShow.eventDate).format("DD/MM/YYYY")}
              readOnly
            />
          </div>
          <div className="form-group">
            <label>Open Gates:</label>
            <input
              type="text"
              value={eventToShow.eventOpenGates.slice(0, 5)}
              readOnly
            />
          </div>
          <div className="form-group">
            <label>Begin At:</label>
            <input
              type="text"
              value={eventToShow.eventBeginAt.slice(0, 5)}
              readOnly
            />
          </div>
          <div className="form-group">
            <label>End At:</label>
            <input
              type="text"
              value={eventToShow.eventEndAt.slice(0, 5)}
              readOnly
            />
          </div>
          <div className="form-group">
            <label>Producer:</label>
            <input type="text" value={eventToShow.userName} readOnly />
          </div>
          <div className="form-group">
            <label>Auditorium:</label>
            <input type="text" value={eventToShow.auditoriumName} readOnly />
          </div>
          <div className="form-group">
            <label>Remarks:</label>
            <textarea value={eventToShow.eventRemarks} readOnly />
          </div>
          <div className="form-actions">
            <button className="btn-save" onClick={handleClickBtnSave}>
              Save
            </button>
            <button className="btn-delete" onClick={handleClickBtnDelete}>
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminEvent;
