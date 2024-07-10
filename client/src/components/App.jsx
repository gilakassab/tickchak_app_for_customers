import React, { useState, createContext, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import AboutUs from "./AboutUs";
import Contact from "./Contact";
import Event from "../pages/Event";
import Events from "./Events";
import Order from "../pages/Order";
import ProducerHome from "../pages/ProducerHome";
import ProducerLogin from "../pages/ProducerLogin";
import NewEvent from "../pages/NewEvent.jsx";
import NewAuditorium from "../pages/NewAuditorium.jsx";
import SignUp from "../pages/SignUp";
import AdminHome from "../pages/AdminHome.jsx";



export const EventContext = createContext();
export const useEventContext = () => useContext(EventContext);

const EventProvider = ({ children }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeComponent, setActiveComponent] = useState("order"); // משתנה חדש לניהול הקומפוננטה הפעילה

  return (
    <EventContext.Provider value={{ selectedEvent, setSelectedEvent , activeComponent, setActiveComponent }}>
      {children}
    </EventContext.Provider>
  );
};

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
                  <Route path="event/:id" element={<Event />} />
                  <Route path="event/:id/order" element={<Order />} />
                  <Route path="signup" element={<SignUp />} />
                  <Route path="producerlogin" element={<ProducerLogin />} />
                  <Route path="producer/:id" element={<ProducerHome />} />
                  <Route path="/producer/:id/newevent" element={<NewEvent />} />
                  <Route path="adminhome" element={<AdminHome />} />
                  <Route
                    path="newauditorium/:name"
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