import React from 'react';
import { Link, NavLink } from "react-router-dom";
import AboutUs from './AboutUs';


function MainHeader() {
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616",
        textDecorationColor: "rgb(127, 205, 179)"
    };

    return (
        <header className="main-header">
            <Link className="site-logo" to="/">Tickchak</Link>
            <nav className="nav-header1">
                <NavLink
                    className="nav-link1"
                    to="/home"
                    activeStyle={activeStyles}
                >
                   Home
                </NavLink>
                <NavLink
                    className="nav-link1"
                    to="/tickchak/aboutus#about"
                    activeStyle={activeStyles}
                >
                    About Us
                   {/* <a href="/tickchak/aboutus" className="nav-link1"> About Us</a> */}
                </NavLink>
                <NavLink
                    className="nav-link1"
                    to="/contact#contact"
                    activeStyle={activeStyles}
                >
                    Contact Us
                </NavLink>
            </nav>
        </header>
    );
}

export default MainHeader;
