import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { EventContext } from '../components/App';
import MainHeader from '../components/MainHeader';
import '../css/Event.css'
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import moment from 'moment';
import Timer from '../components/Timer';

function Event() {
    const { selectedEvent, setSelectedEvent } = useContext(EventContext);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (!selectedEvent) {
          console.log(id);
            fetchEventFromServer(id);
        } else {
            setLoading(false);
        }
    }, [selectedEvent, id]);

    const fetchEventFromServer = async (id) => {
        try {
          
            const response = await fetch(`http://localhost:3300/events/${id}`);
            const event = await response.json();
            setSelectedEvent(event);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching event:", error);
            setLoading(false);
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
                    <Timer eventDate={selectedEvent.eventDate} eventBeginAt={selectedEvent.eventBeginAt}/>
                    <img id='showcase' className='eventPic' src={selectedEvent.eventPicUrl} alt={selectedEvent.eventName} />
                    <h1 className='detailsEvents'>{selectedEvent.eventName} | {formattedDate} | {selectedEvent.eventBeginAt} | {selectedEvent.auditoriumName} </h1>
                    <Link to={`/tickchak/event/${selectedEvent.eventId}/order`} key={selectedEvent.eventId}>
                        <button className='buttonTicketHere'>Tickets here!</button>
                    </Link>
                </div>
                <Contact phoneToContact={selectedEvent.phoneToContact} emailToContact={selectedEvent.emailToContact} />
                <Footer />
            </div>
        </>
    );
}

export default Event;
