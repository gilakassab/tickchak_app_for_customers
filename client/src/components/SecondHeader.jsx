import React, { useContext,useState } from 'react';
import { Link, NavLink } from "react-router-dom"
import '../css/Header.css'

    

function SecondHeader() {
    const [viewEvents,setViewEvents] = useState("allEvents");
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616",
        textDecorationColor: "rgb(127, 205, 179)"
    };
     return (
        <div>gfrsh</div>
            // <header className="main-header">
            //     <Link className="site-logo" to="/home">PhotoLife📸</Link>
            //     <nav className="nav-header">
            //     <NavLink
            //             to={"/home/allevents"}
            //             style={({ isActive }) => isActive ? activeStyles : null  && setViewEvents("allevents")}
            //         >
            //             All Events
            //         </NavLink>
            //         <NavLink
            //             to="/home/shows"
            //             style={({ isActive }) => isActive ? activeStyles : null && setViewEvents("shows")}
            //         >
            //             Shows   
            //         </NavLink>
            //         <NavLink
            //             to="/home/conferences"
            //             style={({ isActive }) => isActive ? activeStyles: null && setViewEvents("conferences")}
            //         >
            //             Conference
            //         </NavLink>
                   
            //     </nav>
            //     <Events viewEvents={viewEvents} />
            // </header>
        )
    }
    export default SecondHeader

