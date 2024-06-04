import React, { useState, useEffect, useCallback } from "react";

function Events({ viewEvents }) {
  const max_limit = 16;
  const [events, setEvents] = useState([]);
  const [loadMoreVisible, setLoadMoreVisible] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [cache, setCache] = useState({}); // Cache to store events data for different categories

  useEffect(() => {
    if (viewEvents) {
      if (cache[viewEvents]) {
        // Use cached data if available
        const { data, hasMore } = cache[viewEvents];
        setEvents(data);
        setLoadMoreVisible(hasMore);
        setStartIndex(data.length);
      } else {
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
      {loadMoreVisible && (
        <button onClick={handleSeeMore} className="see-more-button">
          See More 👉
        </button>
      )}
    </div>
  );
}

export default Events;
