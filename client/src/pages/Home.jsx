import React from 'react';
import MainHeader from '../components/MainHeader';
import SecondHeader from '../components/SecondHeader';
import Events from '../components/Events';
import AboutUs from '../components/AboutUs';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

function Home() {
  return (
    <div>
      <MainHeader headerPage={'home'} />
      <div className="home">
        <div className="moving-text">TICKCHAK</div>
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>
      <SecondHeader />
      <Events />
      <div id="about">
        <AboutUs />
      </div>
      <div id="contact">
        <Contact phoneToContact={'*6565'} emailToContact={'info@tickchak.co.il'}/>
      </div>
     <Footer />
    </div>
   
  );
}

export default Home;
