import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import '../src/css/App.css'


// const EventContext = createContext();

// export const useEventContext = () => useContext(EventContext);

// export const EventProvider = ({ children }) => {
//   const [selectedEvent, setSelectedEvent] = useState(null);}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   
    <App />
    {/* <> <MainHeader/>
    <br/>
    <SecondHeader/> */}
    {/* </> */}
   

  </React.StrictMode>
)