import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import { FiX } from 'react-icons/fi';
import { useDropzone } from 'react-dropzone';
import '../css/NewEvent.css';

function NewEvent() {
  const navigate = useNavigate();
  const { id: producerId } = useParams();
  const [currentStage, setCurrentStage] = useState(0);
  const [eventName, setEventName] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState({ openGates: '18:00', beginAt: '19:00', endAt: '22:00' });
  const [location, setLocation] = useState('');
  const [otherLocation, setOtherLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState('');
  const [auditoriums, setAuditoriums] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const stages = [
    'Event Name',
    'Category',
    'Date and Time',
    'Location',
    'Description',
    'Price'
  ];

  useEffect(() => {
    const fetchAuditoriums = async () => {
      try {
        const response = await fetch('http://localhost:3300/auditoriums?exists=true');
        const data = await response.json();
        setAuditoriums(data);
      } catch (error) {
        console.error('Error fetching auditoriums:', error);
      }
    };

    fetchAuditoriums();
  }, []);

  const handleNextStage = () => {
    if (!validateCurrentStage()) {
      return;
    }
    if (currentStage < stages.length - 1) {
      setCurrentStage(currentStage + 1);
      setErrorMessage('');
    }
  };

  const handlePreviousStage = (index) => {
    if (!successMessage && index < currentStage) {
      setCurrentStage(index);
      setErrorMessage('');
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
      case 5:
        if (!price) {
          setErrorMessage('Please enter the price.');
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
    formData.append('eventDate', date.toISOString());
    formData.append('eventOpenGates', time.openGates);
    formData.append('eventBeginAt', time.beginAt);
    formData.append('eventEndAt', time.endAt);
    formData.append('eventProducer', producerId);
    formData.append('eventRemarks', description);
    formData.append('auditoriumName', location === 'OTHER' ? 'OTHER' : location);
    formData.append('otherLocation', location === 'OTHER' ? otherLocation : '');
    if (image) {
      formData.append('image', image);
    }
    formData.append('eventCategory', category);
    formData.append('eventPrice', price); // הוספת המחיר לנתונים הנשלחים לשרת
    formData.append('eventIsAllowed', '0');

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

  const handleExit = () => {
    navigate(`/tickchak/producer/${producerId}`);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        setImage(acceptedFiles[0]);
      }
    }
  });

  return (
    <div className="new-event">
      <div className="exit-button" onClick={handleExit}>
        <FiX />
      </div>
      <div className="stages">
        {stages.map((stage, index) => (
          <div
            key={index}
            className={`stage ${index <= currentStage ? 'active' : ''} ${successMessage ? 'disabled' : ''}`}
            onClick={() => handlePreviousStage(index)}
          >
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
                onChange={(e) => {
                  setEventName(e.target.value);
                  if (errorMessage && e.target.value) {
                    setErrorMessage('');
                  }
                }}
              />
              <button className="next-button" onClick={handleNextStage}>Next</button>
              <div className={`error-message ${errorMessage ? 'show' : ''}`}>{errorMessage}</div>
            </div>
          )}

          {currentStage === 1 && (
            <div className="stage-content">
              <label>Category:</label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  if (errorMessage && e.target.value) {
                    setErrorMessage('');
                  }
                }}
              >
                <option value="">Select Category</option>
                <option value="Conference">Conference</option>
                <option value="Performance">Performance</option>
                <option value="None">None</option>
              </select>
              <button className="next-button" onClick={handleNextStage}>Next</button>
              <div className={`error-message ${errorMessage ? 'show' : ''}`}>{errorMessage}</div>
            </div>
          )}

          {currentStage === 2 && (
            <div className="stage-content">
              <label>Date:</label>
              <Calendar
                onChange={setDate}
                value={date}
              />
              <div className="time-picker-group">
                <div className="time-picker">
                  <label>Open Gates:</label>
                  <TimePicker
                    onChange={(value) => {
                      setTime({ ...time, openGates: value });
                      if (errorMessage && value) {
                        setErrorMessage('');
                      }
                    }}
                    value={time.openGates}
                    clockIcon={null}
                    disableClock={true}
                  />
                </div>
                <div className="time-picker">
                  <label>Begin At:</label>
                  <TimePicker
                    onChange={(value) => {
                      setTime({ ...time, beginAt: value });
                      if (errorMessage && value) {
                        setErrorMessage('');
                      }
                    }}
                    value={time.beginAt}
                    clockIcon={null}
                    disableClock={true}
                  />
                </div>
                <div className="time-picker">
                  <label>End At:</label>
                  <TimePicker
                    onChange={(value) => {
                      setTime({ ...time, endAt: value });
                      if (errorMessage && value) {
                        setErrorMessage('');
                      }
                    }}
                    value={time.endAt}
                    clockIcon={null}
                    disableClock={true}
                  />
                </div>
              </div>
              <button className="next-button" onClick={handleNextStage}>Next</button>
              <div className={`error-message ${errorMessage ? 'show' : ''}`}>{errorMessage}</div>
            </div>
          )}

          {currentStage === 3 && (
            <div className="stage-content">
              <label>Location:</label>
              <select
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  if (errorMessage && e.target.value) {
                    setErrorMessage('');
                  }
                }}
              >
                <option value="">Select Location</option>
                {auditoriums.map((auditorium, index) => (
                  <option key={index} value={auditorium.auditoriumName}>{auditorium.auditoriumName}</option>
                ))}
                <option value="OTHER">Other</option>
              </select>
              {location === 'OTHER' && (
                <input
                  type="text"
                  placeholder="Other Location"
                  value={otherLocation}
                  onChange={(e) => {
                    setOtherLocation(e.target.value);
                    if (errorMessage && e.target.value) {
                      setErrorMessage('');
                    }
                  }}
                />
              )}
              <button className="next-button" onClick={handleNextStage}>Next</button>
              <div className={`error-message ${errorMessage ? 'show' : ''}`}>{errorMessage}</div>
            </div>
          )}

          {currentStage === 4 && (
            <div className="stage-content">
              <label>Description:</label>
              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (errorMessage && e.target.value) {
                    setErrorMessage('');
                  }
                }}
              />
              <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Drag and drop an image here, or click to select one</p>
                {image && (
                  <div className="image-preview">
                    <img src={URL.createObjectURL(image)} alt="Event" />
                  </div>
                )}
              </div>
              <button className="next-button" onClick={handleNextStage}>Next</button>
              <div className={`error-message ${errorMessage ? 'show' : ''}`}>{errorMessage}</div>
            </div>
          )}
          {currentStage === 5 && (
            <div className="stage-content">
              <label>Price:</label>
              <input
                type="text"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                  if (errorMessage && e.target.value) {
                    setErrorMessage('');
                  }
                }}
              />
              <button className="next-button" onClick={handleSubmit}>Submit</button>
              <div className={`error-message ${errorMessage ? 'show' : ''}`}>{errorMessage}</div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default NewEvent;


/*
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import { FiX } from 'react-icons/fi';
import { useDropzone } from 'react-dropzone';
import '../css/NewEvent.css';

function NewEvent() {
  const navigate = useNavigate();
  const { id: producerId } = useParams();
  const [currentStage, setCurrentStage] = useState(0);
  const [eventName, setEventName] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState({ openGates: '18:00', beginAt: '19:00', endAt: '22:00' });
  const [location, setLocation] = useState('');
  const [otherLocation, setOtherLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState('');
  const [auditoriums, setAuditoriums] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const stages = [
    'Event Name',
    'Category',
    'Date and Time',
    'Location',
    'Description',
    'Price'
  ];

  useEffect(() => {
    const fetchAuditoriums = async () => {
      try {
        const response = await fetch('http://localhost:3300/auditoriums?exists=true');
        const data = await response.json();
        setAuditoriums(data);
      } catch (error) {
        console.error('Error fetching auditoriums:', error);
      }
    };

    fetchAuditoriums();
  }, []);

  const handleNextStage = () => {
    if (!validateCurrentStage()) {
      return;
    }
    if (currentStage < stages.length - 1) {
      setCurrentStage(currentStage + 1);
      setErrorMessage('');
    }
  };

  const handlePreviousStage = (index) => {
    if (!successMessage && index < currentStage) {
      setCurrentStage(index);
      setErrorMessage('');
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
      case 5:
        if (!price) {
          setErrorMessage('Please enter the price.');
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
    formData.append('eventDate', date.toISOString());
    formData.append('eventOpenGates', time.openGates);
    formData.append('eventBeginAt', time.beginAt);
    formData.append('eventEndAt', time.endAt);
    formData.append('eventProducer', producerId);
    formData.append('eventRemarks', description);
    formData.append('auditoriumName', location === 'OTHER' ? 'OTHER' : location);
    formData.append('otherLocation', location === 'OTHER' ? otherLocation : '');
    if (image) {
      formData.append('image', image);
    }
    formData.append('eventCategory', category);
    formData.append('eventPrice', price); // הוספת המחיר לנתונים הנשלחים לשרת
    formData.append('eventIsAllowed', '0');

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

  const handleExit = () => {
    navigate(`/tickchak/producer/${producerId}`);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        setImage(acceptedFiles[0]);
      }
    }
  });

  return (
    <div className="new-event">
      <div className="exit-button" onClick={handleExit}>
        <FiX />
      </div>
      <div className="stages">
        {stages.map((stage, index) => (
          <div
            key={index}
            className={`stage ${index <= currentStage ? 'active' : ''} ${successMessage ? 'disabled' : ''}`}
            onClick={() => handlePreviousStage(index)}
          >
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
                onChange={(e) => {
                  setEventName(e.target.value);
                  if (errorMessage && e.target.value) {
                    setErrorMessage('');
                  }
                }}
              />
              <button className="next-button" onClick={handleNextStage}>Next</button>
              <div className={`error-message ${errorMessage ? 'show' : ''}`}>{errorMessage}</div>
            </div>
          )}

          {currentStage === 1 && (
            <div className="stage-content">
              <label>Category:</label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  if (errorMessage && e.target.value) {
                    setErrorMessage('');
                  }
                }}
              >
                <option value="">Select Category</option>
                <option value="Conference">Conference</option>
                <option value="Performance">Performance</option>
                <option value="None">None</option>
              </select>
              <button className="next-button" onClick={handleNextStage}>Next</button>
              <div className={`error-message ${errorMessage ? 'show' : ''}`}>{errorMessage}</div>
            </div>
          )}

          {currentStage === 2 && (
            <div className="stage-content">
              <label>Date:</label>
              <Calendar
                onChange={setDate}
                value={date}
              />
              <div className="time-picker-group">
                <div className="time-picker">
                  <label>Open Gates:</label>
                  <TimePicker
                    onChange={(value) => {
                      setTime({ ...time, openGates: value });
                      if (errorMessage && value) {
                        setErrorMessage('');
                      }
                    }}
                    value={time.openGates}
                    clockIcon={null}
                    disableClock={true}
                  />
                </div>
                <div className="time-picker">
                  <label>Begin At:</label>
                  <TimePicker
                    onChange={(value) => {
                      setTime({ ...time, beginAt: value });
                      if (errorMessage && value) {
                        setErrorMessage('');
                      }
                    }}
                    value={time.beginAt}
                    clockIcon={null}
                    disableClock={true}
                  />
                </div>
                <div className="time-picker">
                  <label>End At:</label>
                  <TimePicker
                    onChange={(value) => {
                      setTime({ ...time, endAt: value });
                      if (errorMessage && value) {
                        setErrorMessage('');
                      }
                    }}
                    value={time.endAt}
                    clockIcon={null}
                    disableClock={true}
                  />
                </div>
              </div>
              <button className="next-button" onClick={handleNextStage}>Next</button>
              <div className={`error-message ${errorMessage ? 'show' : ''}`}>{errorMessage}</div>
            </div>
          )}

          {currentStage === 3 && (
            <div className="stage-content">
              <label>Location:</label>
              <select
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  if (errorMessage && e.target.value) {
                    setErrorMessage('');
                  }
                }}
              >
                <option value="">Select Location</option>
                {auditoriums.map((auditorium) => (
                  <option key={auditorium} value={auditorium}>
                    {auditorium}
                  </option>
                ))}
                <option value="OTHER">Other</option>
              </select>
              {location === 'OTHER' && (
                <input
                  type="text"
                  value={otherLocation}
                  onChange={(e) => {
                    setOtherLocation(e.target.value);
                    if (errorMessage && e.target.value) {
                      setErrorMessage('');
                    }
                  }}
                />
              )}
              <button className="next-button" onClick={handleNextStage}>Next</button>
              <div className={`error-message ${errorMessage ? 'show' : ''}`}>{errorMessage}</div>
            </div>
          )}

          {currentStage === 4 && (
            <div className="stage-content">
              <label>Description:</label>
              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (errorMessage && e.target.value) {
                    setErrorMessage('');
                  }
                }}
              ></textarea>
              <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                {image ? (
                  <div className="uploaded-image">
                    <img src={URL.createObjectURL(image)} alt="Uploaded" />
                  </div>
                ) : (
                  <p>Drag 'n' drop an image here, or click to select one</p>
                )}
              </div>
              <button className="next-button" onClick={handleNextStage}>Next</button>
              <div className={`error-message ${errorMessage ? 'show' : ''}`}>{errorMessage}</div>
            </div>
          )}

          {currentStage === 5 && (
            <div className="stage-content">
              <label>Price:</label>
              <input
                type="text"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                  if (errorMessage && e.target.value) {
                    setErrorMessage('');
                  }
                }}
              />
              <button className="next-button" onClick={handleNextStage}>Next</button>
              <div className={`error-message ${errorMessage ? 'show' : ''}`}>{errorMessage}</div>
            </div>
          )}

          {currentStage === stages.length && (
            <button className="submit-button" onClick={handleSubmit}>Submit</button>
          )}
        </>
      )}
    </div>
  );
}

export default NewEvent;


*/