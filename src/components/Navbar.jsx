import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">SmartBooking</div>
      <ul className="navbar-links">
        <li className={location.pathname === '/dashboard' ? 'active' : ''}><Link to="/dashboard">Dashboard</Link></li>
        <li className={location.pathname === '/profile' ? 'active' : ''}><Link to="/profile">Profile</Link></li>
        <li className={location.pathname === '/booking' ? 'active' : ''}><Link to="/booking">Booking</Link></li>
        {!isLoggedIn && (
          <li className={location.pathname === '/login' ? 'active' : ''}><Link to="/login">Login</Link></li>
        )}
        {isLoggedIn && (
          <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar; 