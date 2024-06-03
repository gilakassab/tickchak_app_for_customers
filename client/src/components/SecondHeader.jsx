import React, { useState } from 'react';
import Events from './Events';


function SecondHeader() {
    const [viewEvents, setViewEvents] = useState("allEvents");
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
                        className={viewEvents === "show" ? "active" : ""}
                        onClick={() => handleButtonClick("show")}
                    >
                        Shows
                    </button>
                </div>
                <div className="nav-link">
                    <button
                        className={viewEvents === "conference" ? "active" : ""}
                        onClick={() => handleButtonClick("conference")}
                    >
                        Conferences
                    </button>
                </div>
            </nav>
            <Events viewEvents={viewEvents} />
        </header>
    );
}

export default SecondHeader;
