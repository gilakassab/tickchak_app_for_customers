import React, { useState } from 'react';
import Events from './Events';


function SecondHeader() {
    const [viewEvents, setViewEvents] = useState("allEvents");
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616",
        textDecorationColor: "rgb(127, 205, 179)"
    };

    const handleButtonClick = (view) => {
        setViewEvents(view);
    };

    return (
        <header className="main-header">
            <nav className="nav-header">
                <div className="nav-link">
                    <button
                        className={viewEvents === "allEvents" ? "active" : ""}
                        onClick={() => handleButtonClick("allEvents")}
                    >
                        All Events
                    </button>
                </div>
                <div className="nav-link">
                    <button
                        className={viewEvents === "shows" ? "active" : ""}
                        onClick={() => handleButtonClick("shows")}
                    >
                        Shows
                    </button>
                </div>
                <div className="nav-link">
                    <button
                        className={viewEvents === "conferences" ? "active" : ""}
                        onClick={() => handleButtonClick("conferences")}
                    >
                        Conference
                    </button>
                </div>
            </nav>
            <Events />
        </header>
    );
}

export default SecondHeader;
