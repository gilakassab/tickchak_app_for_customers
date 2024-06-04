import React, { useState, useEffect } from "react";

function Events({ viewEvents }) {
  const max_limit = 16;
  const [events, setEvents] = useState([]);
  const [loadMoreVisible, setLoadMoreVisible] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const [prevAllEvent, setPrevAllEvent] = useState([]);
  const [prevShows, setPrevShows] = useState([]);
  const [prevConferences, setPrevConferences] = useState([]);


  useEffect(() => {
    if (viewEvents) {
      setStartIndex(0);
      fetchEvents(0, max_limit);
    }
    console.log("events");
    console.log(events);
  }, [viewEvents]);

  const fetchEvents = (start, limit) => {
    console.log("countRequests");
    fetch(`http://localhost:3300/events?category=${viewEvents}&_start=${start}&_limit=${limit}`)
      .then((res) => res.json())
      .then((moreEvents) => {
        if (moreEvents.length === 0) {
          setLoadMoreVisible(false);
        }

        if (start === 0) {
          setEvents(moreEvents);
        } else {
          setEvents((prevEvents) => [...prevEvents, ...moreEvents]);
        }

        setStartIndex(start + limit);
      })
      .catch((error) => console.error("Error fetching events:", error));
  };

  const handleSeeMore = () => {
    fetchEvents(startIndex, max_limit);
  };

  const eventsElements = events.map((ev, index) => (
    <div key={ev.eventId || index} className="event-tile">
      <div className="event-info">
        <img src={ev.eventPicUrl} alt={ev.eventName} />
        <p>{ev.eventName}</p>
        <p>{ev.eventRemarks}</p>
        <p>{ev.eventDate}</p>
        <p>{ev.eventBeginAt}</p>
        <p>{ev.auditoriumName}</p>
      </div>
    </div>
  ));

  return (
    <div>
      <div className="event-list">{eventsElements}</div>
      {loadMoreVisible && viewEvents && (
        <button onClick={handleSeeMore} className="see-more-button">
          See More 👉
        </button>
      )}
    </div>
  );
}

export default Events;