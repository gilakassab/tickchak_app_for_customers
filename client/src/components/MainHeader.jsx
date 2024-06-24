import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/MainHeader.css";

function MainHeader({ headerPage }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const tickectHereClicked = () => {
    navigate(`/tickchak/event/${id}/order`);
  };

  const logoClicked = () => {
    navigate(`/tickchak`);
  };

  const producerClicked = () => {
    navigate("/login"); // הפניה לקומפוננטת ההתחברות (LogIn)
  };

  return (
    <header className="main-header">
      <button className="site-logo" onClick={logoClicked}>
        Tickchak
      </button>
      {headerPage === "home" && (
        <nav className="nav-header1">
          <a className="nav-link1" href="#home">
            Home
          </a>
          <a className="nav-link1" href="#about">
            About Us
          </a>
          <a className="nav-link1" href="#contact">
            Contact Us
          </a>
          <button className="producer-button" onClick={producerClicked}>
            Producer
          </button>
        </nav>
      )}
      {headerPage === "event" && (
        <nav className="nav-header1">
          <a className="nav-link1" href="#showcase">
            Showcase
          </a>
          <a className="nav-link1" href="#contact">
            Contact Us
          </a>
          <button className="buttonTicketHere" onClick={tickectHereClicked}>
            Tickets here!
          </button>
        </nav>
      )}
      {headerPage === "order" && (
        <nav className="nav-header1">
          <button className={`nav-button ${headerPage === 'order' ? 'active' : ''}`}>
            Order
          </button>
          <p className="p-header">➟</p>
          <button className={`nav-button ${headerPage === 'personalInformation' ? 'active' : ''}`}>
            Personal Information
          </button>
          <p className="p-header">➟</p>
          <button className={`nav-button ${headerPage === 'payment' ? 'active' : ''}`}>
            Payment
          </button>
          <p className="p-header">➟</p>
          <button className="nav-button">
            Finish
          </button>
        </nav>
      )}
    </header>
  );
}

export default MainHeader;
