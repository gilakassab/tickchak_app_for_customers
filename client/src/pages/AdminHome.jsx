

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "../css/AdminHome.css";
import { BsSave } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";


function AdminHome() {
  const [events, setEvents] = useState([]);
  const [auditoriums, setAuditoriums] = useState([]);
  const [navView, setNavView] = useState("events");
  const [error,setError]=useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (navView === 'events') {
      fetchEventsFromServer();
    }
  }, [navView]);

  useEffect(() => {
    fetchAuditoriumsFromServer();
  }, []);

  const fetchEventsFromServer = async () => {
    try {
      const response = await fetch('http://localhost:3300/events', {
        credentials: "include"
      });
      const data = await response.json();
      console.log(data)
      if (Array.isArray(data)) {
        setEvents(data);
      } else {
        alert("Unexpected response format:", data);
      }
    } catch (error) {
     alert("Error fetching events:", error);
    }
  };

  const fetchAuditoriumsFromServer = async () => {
    try {
      const response = await fetch('http://localhost:3300/auditoriums', {
        credentials: 'include',
      });
      const data = await response.json();

      if (Array.isArray(data)) {
        setAuditoriums(data);
      } else {
        alert('Unexpected response format:', data);
      }
    } catch (error) {
      alert('Error fetching auditoriums:', error);
    }
  };

  const onSaveEvent = (updatedEvent) => {
    const updatedEvents = events.filter(event =>
      event.eventId !== updatedEvent.eventId
    );
    setEvents(updatedEvents);
  };

  const handleClickBtnSave = async (event) => {
    console.log(event.eventId);
    const auditoriumExists = auditoriums.some(
      (auditorium) => auditorium.auditoriumName === event.auditoriumName
    );
    if (auditoriumExists) {
      alert("Cannot save because the auditorium doesnt exists.");
    } else {
      try {
        const response = await fetch(
          `http://localhost:3300/events/${event.eventId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify({eventDate: event.eventDate, auditoriumId:event.auditoriumId}),
            credentials: "include"
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update event");
        }
        const data = await response.json();
        handleAddSeatsToEvent(event);
        
       onSaveEvent(event);
       const text = "Dear producer . We are glad to tell you that your suggest for the event was accepted. Here is our phone *1212. Be in touch";
        handleSendEmail(event,text);
      } catch (error) {
        alert("Error updating event:", error);
      }
    }
  };

  const handleClickBtnDelete = async (event) => {
    try {
      const response = await fetch(
        `http://localhost:3300/events/${event.eventId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include"
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }
      
      onSaveEvent(event);
      const text =`Dear ${event.userName}.
        We are sorry telling you that your suggest have been rejected.
        Here is our phone: *1212. You can try to talk with us always.
        Be in touch`;
        handleSendEmail(event,text);
    } catch (error) {
     alert("Error deleting event:", error);
    }
  };

  const handleAddSeatsToEvent = async (event) =>{
    try {
      const response = await fetch(
        `http://localhost:3300/seatsTaken?eventId=${event.eventId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body:JSON.stringify({ auditoriumId: event.auditoriumId }),
          credentials: "include"
        }
      );

      if (!response.ok) {
        try { await fetch(
          `http://localhost:3300/events/${event.eventId}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
          }
        );
        throw new Error("Failed to update event");}
        catch(error){
          alert("Error Deleting event:", error);
        }
      
      }
      
    } catch (error) {
      alert("Error updating event:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3300/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
        navigate('/tickchak/producerlogin');
      } else {
       alert('Failed to log out');
      }
    } catch (error) {
      alert('Error logging out:', error);
    }
  };

  const handleAuditoriumClick = (auditoriumName) => {
    navigate(`/tickchak/newauditorium/${auditoriumName}`);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSendEmail = (event,text) =>{
    if (!validateEmail(event.userEmail)) {
      setError("Invalid email address");
      return;
    } else {
      setError("");
    }

    fetch(`http://localhost:3300/sendEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: event.userEmail,
        subject: `New message from Tickchak's team.`,
        text: text,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("successing sending email");
  }})
      .catch((error) => {
        alert("error :(" + error);
      });
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
        <button
          className="nav-button"
          onClick={handleLogout}
        >
          LogOut
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
                <th>Auditorium</th>
                <th>Remarks</th>
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
                  <td>{event.userName}</td>
                  <td>{event.auditoriumName}</td>
                  <td>{event.eventRemarks}</td>
                  <td><BsSave className="BsSave" onClick={()=>handleClickBtnSave(event)}/>
                  <MdDeleteOutline className="mdDeleteOutline" onClick={()=>handleClickBtnDelete(event)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {navView === "auditoriums" && (
          <div>
            <h2>Auditoriums List</h2>
            <ul className="auditorium-list">
              {auditoriums.map((auditorium, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleAuditoriumClick(auditorium.auditoriumName)}
                    className="auditorium-button"
                  >
                    {auditorium.auditoriumName}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminHome;
