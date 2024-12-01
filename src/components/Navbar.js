// Navbar.js
import React from "react";
import "./Navbar.css"; // Create a separate CSS file for the Navbar

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">Shop</div>
            <ul className="navbar-links">
                <li className="navbar-link">
                    <a href="#home">Home</a>
                </li>
                <li className="navbar-link">
                    <a href="#products">Products</a>
                </li>
                <li className="navbar-link">
                    <a href="#about">About</a>
                </li>
                <li className="navbar-link">
                    <a href="#contact">Contact</a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
