import React, { useContext } from 'react';
import { EventContext } from '../components/App';
import { useParams, useNavigate } from "react-router-dom";
import "../css/MainHeader.css";

function MainHeader({ headerPage }) {
  const { activeComponent,setActiveComponent } = useContext(EventContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const tickectHereClicked = () => {
    navigate(`/tickchak/event/${id}/order`);
    setActiveComponent('order')
  };

  const logoClicked = () => {
    navigate(`/tickchak`);
  };

  const producerLoginClicked = () => {
    navigate("/tickchak/producerlogin");
  };

  return (
    <header className="main-header">
      {headerPage === "home" && (
        <nav className="nav-header1">
          <button className="site-logo" onClick={logoClicked}>
            Tickchak
          </button>
          <div className="nav-links">
            <a className="nav-link1" href="#home">
              Home
            </a>
            <a className="nav-link1" href="#about">
              About Us
            </a>
            <a className="nav-link1" href="#contact">
              Contact Us
            </a>
          </div>
          <button className="producer-button" onClick={producerLoginClicked}>
            ProducerLogin
          </button>
        </nav>
      )}

      {headerPage === "event" && (
        <nav className="nav-header1">
          <button className="site-logo" onClick={logoClicked}>
            Tickchak
          </button>
          <div className="nav-links">
            <a className="nav-link1" href="#showcase">
              Showcase
            </a>
            <a className="nav-link1" href="#about">
            About the event
            </a>
            <a className="nav-link1" href="#contact">
              Contact Us
            </a>
          </div>
          <button className="buttonTicketHere" onClick={tickectHereClicked}>
            Tickets here!
          </button>
        </nav>
      )}

      {headerPage === "order" && (
        <nav className="order-nav">
           <button className="site-logo" onClick={logoClicked}>
            Tickchak
          </button>
          <button className={`nav-button ${activeComponent === 'order' ? 'active' : ''}`}>
            Order
          </button>
          <p className="p-header">➟</p>
          <button className={`nav-button ${activeComponent === 'personalInformation' ? 'active' : ''}`}>
            Personal Information
          </button>
          <p className="p-header">➟</p>
          <button className={`nav-button ${activeComponent === 'payment' ? 'active' : ''}`}>
            Payment
          </button>
          <p className="p-header">➟</p>
          <button className={`nav-button ${activeComponent === 'finish' ? 'active' : ''}`}>
            Finish
          </button>
        </nav>
      )}
    </header>
  );
}

export default MainHeader;
