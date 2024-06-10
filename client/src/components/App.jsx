// import React, { useState, createContext, useContext } from 'react';
// import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";
// import Home from '../pages/Home';
// import AboutUs from './AboutUs';
// import Contact from './Contact';
// import Event from './Event';
// import Order from './Order';
// import ProducerHome from './ProducerHome';
// import ProducerLogin from './ProducerLogin';
// import NewEvent from './NewEvent';
// import NewAuditorium from './NewAuditorium';



// function App() {
  
//   return (
//     <EventProvider>
//     <BrowserRouter>
//     <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/tickchak" element={<Home />} >
//             <Route path="home" element={<Home />} />
//             <Route path="aboutus" element={<AboutUs />} />
//             <Route path="contact" element={<Contact />} />
//             <Route path="event/:id" element={<Event />} >
//               <Route path="order" element={<Order />} />
//             </Route>
//             <Route path="producer" element={<ProducerLogin />} >
//               <Route path=":id" element={<ProducerHome />} />
//               <Route path="newevent" element={<NewEvent />} />
//             </Route>
//             <Route path="newauditorium" element={<NewAuditorium />} /> 
//           </Route>
//         </Routes>
//     </BrowserRouter>
//     </EventProvider>
//   )
// }
// export default App
import React, { useState, createContext, useContext } from "react";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Home from "../pages/Home";
import AboutUs from "./AboutUs";
import Contact from "./Contact";
import Event from "../pages/Event";
import Events from "./Events";
import Order from "./Order";
import ProducerHome from "../pages/ProducerHome";
import ProducerLogin from "../pages/ProducerLogin";
import NewEvent from "./NewEvent";
import NewAuditorium from "./NewAuditorium";

export const EventContext = createContext();
export const useEventContext = () => useContext(EventContext);

const EventProvider = ({ children }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  

  return (
    <EventContext.Provider value={{ selectedEvent, setSelectedEvent }}>
      {children}
    </EventContext.Provider>
  );
};
// if (userData == undefined) {
//   console.log("innnn")
//   setUserData(JSON.parse(storedUserData));
//   console.log(userData)

function Layout({ children }) {
  return children;
}

function App() {
  return (
    <BrowserRouter>
    <EventProvider >
    <Routes>
        <Route path="/" element={<Navigate to="/tickchak" />} />
        <Route
          path="tickchak/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Navigate to="home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="event/:id" element={<Event />}>
                  <Route path="order" element={<Order />} />
                </Route>
                <Route path="producer" element={<ProducerLogin />}>
                  <Route path=":id" element={<ProducerHome />} />
                  <Route path="newevent" element={<NewEvent />} />
                </Route>
                <Route
                  path="newauditorium"
                  element={<NewAuditorium />}
                />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </EventProvider>
      
    </BrowserRouter>
  );
}

export default App;