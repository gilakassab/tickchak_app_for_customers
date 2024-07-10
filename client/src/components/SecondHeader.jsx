import React, { useState } from 'react';
import Events from './Events';
import { FaSearch } from 'react-icons/fa';
import '../css/SecondHeader.css';

function SecondHeader() {
    const [viewEvents, setViewEvents] = useState("allEvents");
    const [searchQuery, setSearchQuery] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleButtonClick = (view) => {
        setViewEvents(view);
        setIsMenuOpen(false);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <header className="second-header">
            <nav className="nav-header">
                <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    Menu
                </button>
                <div className={`nav-links-container ${isMenuOpen ? 'open' : ''}`}>
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
                            className={viewEvents === "performance" ? "active" : ""}
                            onClick={() => handleButtonClick("performance")}
                        >
                            Performances
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
                </div>
                <div className="nav-link search-bar">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            </nav>
            <Events viewEvents={viewEvents} searchQuery={searchQuery} />
        </header>
    );
}

export default SecondHeader;