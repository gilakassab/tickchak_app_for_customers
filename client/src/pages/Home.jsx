import React ,{useState, useEffect}from 'react';
import MainHeader from '../components/MainHeader';
import SecondHeader from '../components/SecondHeader';
import Events from '../components/Events';
import AboutUs from '../components/AboutUs';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

let alertShown = false;


function Home() {
  

  useEffect(() => {
    // Check if the alert has already been shown
    if (!alertShown) {
      alert(`To use this website, you need to set the following variables in your .env file:

        1. ACCESS_TOKEN_SECRET: A string for securing access tokens.
        2. EMAIL_USER: Your email address.
        3. EMAIL_PASS: The app-specific password you need to set up in your email account to send emails from the server.
        4. HOST: The server address (e.g., localhost for local development).
        5. USER: The database username.
        6. DATABASE: The name of the database.
        7. PORT: The port on which the database is running.
        8. PASSWORD: The password for the database user.
        
        Please ensure that all these details are set in your .env file before attempting to run the website.`);
      
      // Set the flag to true after showing the alert
      alertShown = true;
    }
  }, []);

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
