import React, {useState, createContext } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../pages/Home';
import AboutUs from './AboutUs';
import Contact from './Contact';
import Event from './Event';
import Events from './Events';
import Order from './Order';
import ProducerHome from './ProducerHome';
import ProducerLogin from './ProducerLogin';
import NewEvent from './NewEvent';
import NewAuditorium from './NewAuditorium';

export const userContext = createContext();

function App() {

  return (
    <BrowserRouter>
      {/* <userContext.Provider value={{ user, setUser }}> */}
        <Routes>
          <Route path="tickchak" element={<Home />} >
            <Route path="/home" element={<Home />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/events" element={<Events />} />
            <Route path="event/:id" element={<Event />} >
                <Route path="/order" element={<Order />} />
            </Route>
            <Route path="/producer" element={<ProducerLogin />} >
               <Route path="/:id" element={<ProducerHome />} />
               <Route path="/newevent" element={<NewEvent />} />
             </Route>
             <Route path="/newauditorium" element={<NewAuditorium />} />
          </Route>
        </Routes>
      {/* </userContext.Provider> */}
    </BrowserRouter>
  )
}

export default App