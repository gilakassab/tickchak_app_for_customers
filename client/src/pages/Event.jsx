import React, { useContext, useEffect } from 'react';
import { useParams, } from 'react-router-dom';
import { EventContext } from '../components/App';
import MainHeader from '../components/MainHeader';
import '../css/Event.css'
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import moment from 'moment';
import Timer from '../components/Timer';

function Event() {
  const { id } = useParams();
  const { selectedEvent } = useContext(EventContext);
  // const [headerPage, setHeaderPage] = useState('home');
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
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
      <img id='showcase' className='eventPic' src={selectedEvent.eventPicUrl} alt={selectedEvent.eventName}  />
      <h1 className='detailsEvents'>{selectedEvent.eventName} | {formattedDate} | {selectedEvent.eventBeginAt} | {selectedEvent.auditoriumName} </h1>
      </div>
     <Contact phoneToContact={selectedEvent.phoneToContact} emailToContact={selectedEvent.emailToContact} />
     <Footer />
    </div>
    </>
  );
}

export default Event;
