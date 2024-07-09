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
      <div  className="home section" id="home">
        <div className="moving-text">Tickchak</div>
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>
      <SecondHeader />
      <Events />
      <div className="section" id="about">
        <AboutUs />
      </div>
      <div className="section" id="contact">
        <Contact phoneToContact={'*6565'} emailToContact={'info@tickchak.co.il'}/>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
