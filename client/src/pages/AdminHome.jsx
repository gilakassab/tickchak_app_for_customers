import React, { useEffect, useState } from "react";
import moment from "moment";
import "../css/AdminHome.css";
import MainHeader from "../components/MainHeader";

function AdminHome() {
  const [events, setEvents] = useState([]);
  const [auditoriums, setAuditoriums] = useState([]);
  const [navView, setNavView] = useState("events");

  useEffect(() => {
    if (navView === 'events') {
      fetchEventsFromServer();
    } else {
      fetchAuditoriumsFromServer();
    }
  }, [navView]);

  const fetchAuditoriumsFromServer = async () => {
    try {
      const response = await fetch(`http://localhost:3300/auditoriums`);
      const data = await response.json();

      if (Array.isArray(data)) {
        setAuditoriums(data);
      } else {
        console.error("Unexpected response format:", data);
      }
    } catch (error) {
      console.error("Error fetching auditoriums:", error);
    }
  };

  const fetchEventsFromServer = async () => {
    try {
      const response = await fetch(`http://localhost:3300/events`);
      const data = await response.json();

      if (Array.isArray(data)) {
        setEvents(data);
      } else {
        console.error("Unexpected response format:", data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  return (
    <div>
      <nav className="nav-header">
        <button
          className={`nav-button ${navView === "events" ? "active" : ""}`}
          onClick={() => setNavView("events")}
        >
          Events
        </button>
        <button
          className={`nav-button ${navView === "auditoriums" ? "active" : ""}`}
          onClick={() => setNavView("auditoriums")}
        >
          Auditoriums
        </button>
      </nav>

      <div className="admin-content">
        <h1>Admin Home</h1>

        {navView === "events" && (
          <table className="event-table">
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Date</th>
                <th>Open Gates</th>
                <th>Begin At</th>
                <th>End At</th>
                <th>Producer</th>
                <th>Remarks</th>
                {/* <th>Category</th> */}
                {/* <th>Is Allowed</th> */}
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={index}>
                  <td>{event.eventName}</td>
                  <td>{moment(event.eventDate).format("DD/MM/YYYY")}</td>
                  <td>{event.eventOpenGates.slice(0, 5)}</td>
                  <td>{event.eventBeginAt.slice(0, 5)}</td>
                  <td>{event.eventEndAt.slice(0, 5)}</td>
                  <td>{event.eventProducer}</td>
                  <td>{event.eventRemarks}</td>
                  {/* <td>{event.eventCategory}</td> */}
                  {/* <td>{event.eventIsAllowed ? "Yes" : "No"}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {navView === "auditoriums" && (
          <div>
            <h2>Auditoriums List</h2>
            <ul>
              {auditoriums.map((auditorium, index) => (
                <li key={index}>{auditorium.auditoriumName}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminHome;
