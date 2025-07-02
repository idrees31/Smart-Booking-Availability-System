import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="landing-container">
      <nav className="landing-navbar">
        <div className="logo">SmartBooking</div>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <button className="cta-btn" onClick={handleGetStarted}>Get Started</button>
      </nav>
      <header className="landing-header">
        <h1>Book Me, but Better</h1>
        <p>Smart, simple, and powerful booking for professionals and businesses.</p>
        <button className="cta-btn main-cta" onClick={handleGetStarted}>Create Your Profile</button>
      </header>
      <footer className="landing-footer" id="contact">
        <p>© {new Date().getFullYear()} SmartBooking. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing; 