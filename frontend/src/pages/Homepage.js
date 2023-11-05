import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Homepage.css"

const HomePage =()=> {
  useEffect(() => {
    const userToken = localStorage.getItem("contact-token");
    if (userToken) {
      window.location.href = "/dashboard"; 
    }
  }, [])
  
  return (
    <div className="homepage-2">
      <div className="content-2">
        <h1>Welcome to the Contact Manager App</h1>
        <p>
          Manage your contacts easily with our user-friendly Contact Manager
          App. You can create, update, and delete your contacts in just a few
          clicks.
        </p>
        <div className="cta-buttons-2">
          <Link to="/login" className="cta-button-2">
            Login
          </Link>
          <Link to="/register" className="cta-button-2">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
