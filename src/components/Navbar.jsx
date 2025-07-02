import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="navbar">
      <div className="navbar-logo">SmartBooking</div>
      <ul className="navbar-links">
        <li className={location.pathname === '/dashboard' ? 'active' : ''}><Link to="/dashboard">Dashboard</Link></li>
        <li className={location.pathname === '/profile' ? 'active' : ''}><Link to="/profile">Profile</Link></li>
        <li className={location.pathname === '/booking' ? 'active' : ''}><Link to="/booking">Booking</Link></li>
        <li className={location.pathname === '/login' ? 'active' : ''}><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar; 