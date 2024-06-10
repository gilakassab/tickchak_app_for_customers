import React, { useContext, useEffect } from 'react';
import { useParams, } from 'react-router-dom';
import { EventContext } from '../components/App';
import MainHeader from '../components/MainHeader';
import '../css/Event.css'
import Footer from '../components/Footer';
import Contact from '../components/Contact';

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
  return (
    <>
      <MainHeader headerPage={'event'} />
     <div>
     <div className="event-container">
      <img id='showcase' className='eventPic' src={selectedEvent.eventPicUrl} alt={selectedEvent.eventName} />
      <h1 className='detailsEvents'>{selectedEvent.eventName} | {selectedEvent.eventDate} | {selectedEvent.eventBeginAt} | {selectedEvent.auditoriumName}</h1>
      </div>
     <Contact emailToContact={'gilakassab@gmail.com'} />
     <Footer />
    </div></>
   
  );
}

export default Event;
