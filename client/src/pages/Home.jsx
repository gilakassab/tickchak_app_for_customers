import React from 'react'

import { NavLink } from "react-router-dom";
import MainHeader from '../components/MainHeader';
import SecondHeader from '../components/SecondHeader';
import Events from '../components/Events';
import AboutUs from '../components/AboutUs';
import Contact from '../components/Contact';
function Home() {
 
  return (
    <div>
      <MainHeader /> 
       <SecondHeader />
      <Events/>
      <AboutUs  />
      <Contact />
    </div>
  )
}

export default Home

