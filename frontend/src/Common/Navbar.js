import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          ContactX
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link one">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link two">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link three">
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link four">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
