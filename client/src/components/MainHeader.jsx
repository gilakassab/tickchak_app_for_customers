import React from 'react';
import { Link, NavLink } from "react-router-dom";


function MainHeader() {
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616",
        textDecorationColor: "rgb(127, 205, 179)"
    };

    return (
        <header className="main-header">
            <a className="site-logo" href="#home">Tickchak</a>
            <nav className="nav-header1">
                <a className="nav-link1" href="#home" style={activeStyles}>Home</a>
                <a className="nav-link1" href="#about" style={activeStyles}>About Us</a>
                <a className="nav-link1" href="#contact" style={activeStyles}>Contact Us</a>
            </nav>
        </header>
    );
}

export default MainHeader;
