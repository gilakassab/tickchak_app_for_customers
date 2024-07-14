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
    const { selectedEvent, setSelectedEvent,setActiveComponent } = useContext(EventContext);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [isEventPast, setIsEventPast] = useState(false);
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

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

    const handleTicketHere = () => {
        setActiveComponent('order')
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
                        <button className='buttonTicketHere-event' onClick={handleTicketHere} disabled={isEventPast}>
                            Tickets here!
                        </button>
                    </Link>
                </div>
                {tooltipVisible && <div className="tooltip" style={{ top: tooltipPosition.top, left: tooltipPosition.left }}>Sorry, ticket sales for this event are not available</div>}
                <Contact phoneToContact={'*6565'} emailToContact={'info@tickchak.co.il'}/>
                <Footer />
            </div>
        </>
    );
}

export default Event;
