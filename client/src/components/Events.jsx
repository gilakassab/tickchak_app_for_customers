import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import moment from 'moment';
import { useEventContext } from './App';

function Events({ viewEvents }) {
  const max_limit = 16;
  const [events, setEvents] = useState([]);
  const [loadMoreVisible, setLoadMoreVisible] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [cache, setCache] = useState({}); // Cache to store events data for different categories
  const { setSelectedEvent } = useEventContext();
  useEffect(() => {
    if (viewEvents) {
      if (cache[viewEvents]) {
        // Use cached data if available
        const { data, hasMore } = cache[viewEvents];
        setEvents(data);
        setLoadMoreVisible(hasMore);
        setStartIndex(data.length);
      } 
      else {
        // Fetch data if not in cache
        setStartIndex(0);
        fetchEvents(0, max_limit, viewEvents);
      }
    }
  }, [viewEvents, cache]);

  const fetchEvents = useCallback((start, limit, category) => {
    fetch(`http://localhost:3300/events?category=${category}&_start=${start}&_limit=${limit}`)
      .then((res) => res.json())
      .then((moreEvents) => {
        const hasMore = moreEvents.length === limit;
        const newEvents = start === 0 ? moreEvents : [...events, ...moreEvents];
        setEvents(newEvents);
        setLoadMoreVisible(hasMore);
        setStartIndex(start + limit);

        // Update cache
        setCache((prevCache) => ({
          ...prevCache,
          [category]: {
            data: newEvents,
            hasMore: hasMore,
          },
        }));
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, [events]);

  const handleSeeMore = () => {
    fetchEvents(startIndex, max_limit, viewEvents);
  };

  const eventsElements = events.map((ev, index) => (
    <Link to={`/tickchak/event/${ev.eventId}`} key={ev.eventId || index} className="event-tile"   onClick={() => handleEventClick(ev)}>
    
      <div className="event-info" >
        <img src={ev.eventPicUrl} alt={ev.eventName} />
        <div className="eventDetails">
        <p className="pEventName">{ev.eventName}</p>
        {/* <p className="pEvent">{ev.eventRemarks}</p> */}
        <p className="pEventDate">{moment(ev.eventDate).format('DD/MM')}</p>
        <p className="pEventDetails">{ev.eventBeginAt}</p>
        <p className="pEventDetails">{ev.auditoriumName}</p>
        </div>
        
      </div>
     
      </Link>
    
  ));
  
  const handleEventClick = (event)=>{
    setSelectedEvent(event);
   
  }
  return (
    <div>
      <div className="event-list">{eventsElements}</div>
      {loadMoreVisible && (
        <button onClick={handleSeeMore} className="see-more-button">
          See More 👉
        </button>
      )}
    </div>
  );
}

export default Events;
