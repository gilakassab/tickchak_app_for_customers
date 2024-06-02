import React, { useState, useEffect} from "react";
// import { useParams} from "react-router-dom";

function Events( {viewEvents}) {
  const max_limit = 16;
  const [events, setEvents] = useState([]);
  const [loadMoreVisible, setLoadMoreVisible] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
//   const { category } = useParams();

  useEffect(() => {
    fetchEvents(0, max_limit);
  },[]); 

  // Empty dependency array ensures this runs only once
  const fetchEvents = (start, limit) => {
    // console.log(category);
    fetch(`http://localhost:3300/events?_start=${start}&_limit=${limit}`)
      .then((res) => res.json())
      .then((moreEvents) => {
        if (moreEvents.length === 0) {
          setLoadMoreVisible(false);
        }
        setEvents((prevEvents) => [...prevEvents, ...moreEvents]);
        setStartIndex(start + limit);
      })
      .catch((error) => console.error("Error fetching events:", error));
  };

  const handleSeeMore = () => {
    fetchEvents(startIndex, max_limit);
  };

  const eventsElements = events.map((ev, index) => (
    <div key={ev.id || index} className="event-tile">
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
  
  const filteredEvents = () => {
    switch (viewEvents) {
      case 'allEvents':
        return eventsElements;
      case 'shows':
        return events.filter(ev => ev.eventCategory.toLowerCase() === 'show').map((ev, index) => (
          <div key={ev.id || index} className="event-tile">
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
      case 'conferences':
        return events.filter(ev => ev.eventCategory.toLowerCase() === 'conference').map((ev, index) => (
          <div key={ev.id || index} className="event-tile">
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
      default:
        return [];
    }
  };
  
  return (
    <div>
      <div className="event-list">{filteredEvents()}</div>
      {loadMoreVisible && (
        <button onClick={handleSeeMore} className="see-more-button">
          See More 👉
        </button>
      )}
    </div>
  );
  
}

export default Events;

