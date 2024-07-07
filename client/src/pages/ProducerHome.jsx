import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import '../css/ProducerHome.css';

function ProducerHome() {
  const [currentStage, setCurrentStage] = useState(0);
  const [eventName, setEventName] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState({ openGates: '18:00', beginAt: '19:00', endAt: '22:00' });
  const [location, setLocation] = useState('');
  const [otherLocation, setOtherLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [auditoriums, setAuditoriums] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const stages = [
    'Event Name',
    'Category',
    'Date and Time',
    'Location',
    'Description'
  ];

  useEffect(() => {
    const fetchAuditoriums = async () => {
      try {
        const response = await fetch('http://localhost:3300/auditoriums?exists=true');
        const data = await response.json();
        const flattenedData = data.flat();
        setAuditoriums(flattenedData);
      } catch (error) {
        console.error('Error fetching auditoriums:', error);
      }
    };

    fetchAuditoriums();
  }, []);

  const handleNextStage = () => {
    if (currentStage < stages.length - 1) {
      setCurrentStage(currentStage + 1);
    }
  };

  const validateCurrentStage = () => {
    switch (currentStage) {
      case 0:
        if (!eventName) {
          setErrorMessage('Please enter the event name.');
          return false;
        }
        break;
      case 1:
        if (!category) {
          setErrorMessage('Please select a category.');
          return false;
        }
        break;
      case 2:
        if (!date || !time.openGates || !time.beginAt || !time.endAt) {
          setErrorMessage('Please select the date and time.');
          return false;
        }
        break;
      case 3:
        if (!location || (location === 'OTHER' && !otherLocation)) {
          setErrorMessage('Please select a location or provide the other location.');
          return false;
        }
        break;
      case 4:
        if (!description) {
          setErrorMessage('Please enter a description.');
          return false;
        }
        if (!image) {
          setErrorMessage('Please upload an image.');
          return false;
        }
        break;
      default:
        break;
    }
    return true;
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateCurrentStage()) {
      return;
    }
  
    const formData = new FormData();
    formData.append('eventName', eventName);
    formData.append('eventDate', date);
    formData.append('eventOpenGates', time.openGates);
    formData.append('eventBeginAt', time.beginAt);
    formData.append('eventEndAt', time.endAt);
    formData.append('eventProducer', 1);
    formData.append('eventRemarks', description);
    formData.append('auditoriumName', location === 'OTHER' ? 'OTHER' : location);
    formData.append('otherLocation', location === 'OTHER' ? otherLocation : '');
    if (image) {
      formData.append('image', image);
    }
    formData.append('eventCategory', category);
    formData.append('eventIsAllowed', 0);
  
    try {
      const response = await fetch('http://localhost:3300/events', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit event');
      }
  
      console.log('Event submitted successfully');
      setSuccessMessage('The event has been successfully registered. It will be forwarded to the site manager for final approval. Thank you for choosing Tickchak.');
    } catch (error) {
      console.error('Error submitting event:', error);
    }
  };

  return (
    <div className="producer-home">
      <div className="stages">
        {stages.map((stage, index) => (
          <div key={index} className={`stage ${index === currentStage ? 'active' : ''}`}>
            {stage}
          </div>
        ))}
      </div>

      {successMessage ? (
        <div className="success-message">
          <strong>{successMessage}</strong>
        </div>
      ) : (
        <>
          {currentStage === 0 && (
            <div className="stage-content">
              <label>Event Name:</label>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
              <button onClick={handleNextStage}>Next</button>
            </div>
          )}

          {currentStage === 1 && (
            <div className="stage-content">
              <label>Category:</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select Category</option>
                <option value="Conference">Conference</option>
                <option value="Performance">Performance</option>
                <option value="None">None</option>
              </select>
              <button onClick={handleNextStage}>Next</button>
            </div>
          )}

          {currentStage === 2 && (
            <div className="stage-content">
              <label>Date:</label>
              <Calendar onChange={setDate} value={date} />
              <label>Open Gates:</label>
              <TimePicker
                onChange={(value) => setTime({ ...time, openGates: value })}
                value={time.openGates}
                clockIcon={null}
                disableClock={true}
              />
              <label>Begin At:</label>
              <TimePicker
                onChange={(value) => setTime({ ...time, beginAt: value })}
                value={time.beginAt}
                clockIcon={null}
                disableClock={true}
              />
              <label>End At:</label>
              <TimePicker
                onChange={(value) => setTime({ ...time, endAt: value })}
                value={time.endAt}
                clockIcon={null}
                disableClock={true}
              />
              <button onClick={handleNextStage}>Next</button>
            </div>
          )}

          {currentStage === 3 && (
            <div className="stage-content">
              <label>Location:</label>
              <select value={location} onChange={(e) => setLocation(e.target.value)}>
                <option value="">Select Location</option>
                {auditoriums.map((auditorium) => (
                  <option key={auditorium.auditoriumId} value={auditorium.auditoriumName}>
                    {auditorium.auditoriumName}
                  </option>
                ))}
                <option value="OTHER">Other</option>
              </select>
              {location === 'OTHER' && (
                <>
                  <label>Other Location:</label>
                  <input
                    type="text"
                    value={otherLocation}
                    onChange={(e) => setOtherLocation(e.target.value)}
                  />
                </>
              )}
              <button onClick={handleNextStage}>Next</button>
            </div>
          )}

          {currentStage === 4 && (
            <div className="stage-content">
              <label>Description:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <label>Upload Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <button onClick={handleSubmit}>Submit</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProducerHome;
