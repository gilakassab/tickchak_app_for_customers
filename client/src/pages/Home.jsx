import React from 'react';
import MainHeader from '../components/MainHeader';
import SecondHeader from '../components/SecondHeader';
import Events from '../components/Events';
import AboutUs from '../components/AboutUs';
import Contact from '../components/Contact';

function Home() {
  return (
    <div>
      <MainHeader />
      <div id="home">
        <img src="../images/logo.jpg" alt="Site Logo" className="site-logo-image" />
      </div>
      <SecondHeader />
      <Events />
      <div id="about">
        <AboutUs />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </div>
  );
}

export default Home;
