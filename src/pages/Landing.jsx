import React from 'react';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing-container">
      <nav className="landing-navbar">
        <div className="logo">SmartBooking</div>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <button className="cta-btn">Get Started</button>
      </nav>
      <header className="landing-header">
        <h1>Book Me, but Better</h1>
        <p>Smart, simple, and powerful booking for professionals and businesses.</p>
        <a href="#" className="cta-btn main-cta">Create Your Profile</a>
      </header>
      <footer className="landing-footer" id="contact">
        <p>© {new Date().getFullYear()} SmartBooking. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing; 