import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { EventContext } from '../components/App';
import MainHeader from '../components/MainHeader';
import '../css/Event.css';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import moment from 'moment';
import Timer from '../components/Timer';

function Event() {
    const { selectedEvent, setSelectedEvent } = useContext(EventContext);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [isEventPast, setIsEventPast] = useState(false);
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
    const buttonRef = useRef(null); // Ref for the button element

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (!selectedEvent) {
            fetchEventFromServer(id);
        } else {
            setLoading(false);
            checkIfEventPast(selectedEvent.eventDate);
        }
    }, [selectedEvent, id]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        if (buttonRef.current) {
            const buttonRect = buttonRef.current.getBoundingClientRect();
            const topOffset = window.innerHeight / 2; // Adjust as needed
            const topPosition = buttonRect.top;

            if (topPosition < topOffset) {
                const rightOffset = window.innerWidth / 2; // Adjust as needed
                buttonRef.current.style.transform = `translateY(${topOffset - topPosition}px) translateX(${rightOffset}px)`;
            } else {
                buttonRef.current.style.transform = 'translateX(50%)';
            }
        }
    };

    const fetchEventFromServer = async (id) => {
        try {
            const response = await fetch(`http://localhost:3300/events/${id}`, { credentials: "include" });
            const event = await response.json();
            setSelectedEvent(event);
            setLoading(false);
            checkIfEventPast(event.eventDate);
        } catch (error) {
            console.error("Error fetching event:", error);
            setLoading(false);
        }
    };

    const checkIfEventPast = (eventDate) => {
        const now = moment();
        const eventMoment = moment(eventDate);
        setIsEventPast(eventMoment.isBefore(now));
    };

    const handleButtonClick = (event) => {
        if (isEventPast) {
            event.preventDefault();
            const rect = event.target.getBoundingClientRect();
            setTooltipPosition({ top: rect.top - 40, left: rect.left + rect.width / 2 });
            setTooltipVisible(true);
            setTimeout(() => setTooltipVisible(false), 10000);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!selectedEvent) {
        return <div>No event selected</div>;
    }

    const formattedDate = moment(selectedEvent.eventDate).format('DD/MM/YYYY');

    return (
        <>
            <MainHeader headerPage={'event'} />
            <div>
                <div className="event-container">
                    <img id='showcase' className='eventPic section' src={`http://localhost:3300/uploads/${selectedEvent.eventPicUrl}`} alt={selectedEvent.eventName} />
                    <div className='detailsEvents'>
                        <h1 className='event-h1'>{selectedEvent.eventName} | {formattedDate} | {selectedEvent.eventBeginAt} | {selectedEvent.auditoriumName} </h1>
                        <Timer eventDate={selectedEvent.eventDate} eventBeginAt={selectedEvent.eventBeginAt} />
                    </div>
                    <p id='about' className="section">{selectedEvent.eventRemarks}</p>
                    <Link to={`/tickchak/event/${selectedEvent.eventId}/order`} key={selectedEvent.eventId}>
                        <button ref={buttonRef} className='buttonTicketHere-event' disabled={isEventPast} onClick={handleButtonClick}>
                            Tickets here!
                        </button>
                    </Link>
                </div>
                {tooltipVisible && <div className="tooltip" style={{ top: tooltipPosition.top, left: tooltipPosition.left }}>Sorry, ticket sales for this event are not available</div>}
                <Contact phoneToContact={selectedEvent.phoneToContact} emailToContact={selectedEvent.emailToContact} />
                <Footer />
            </div>
        </>
    );
}

export default Event;
