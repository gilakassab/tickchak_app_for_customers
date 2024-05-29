import React from 'react'

function MainHeader() {
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616",
        textDecorationColor: "rgb(127, 205, 179)",
    };

    return (
        <div>efwew</div>
        // <header className="main-header">
        //     <Link className="site-logo" to="/">Tickchak📸</Link>
        //     <nav className="nav-header">
        //         <NavLink
        //             to="/home"
        //             style={({ isActive }) => isActive ? activeStyles : null}
        //         >
        //            Home
        //         </NavLink>
        //         <NavLink
        //             to="/aboutus#about"
        //             style={({ isActive }) => isActive ? activeStyles : null}
        //         >
        //             About Us
        //         </NavLink>
        //         <NavLink
        //             to="/contact#contact"
        //             style={({ isActive }) => isActive ? activeStyles : null}
        //         >
        //             Contact Us
        //         </NavLink>
        //     </nav>
        // </header>
    )
}

export default MainHeader