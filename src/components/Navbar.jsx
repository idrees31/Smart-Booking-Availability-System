import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

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
      <style>{`
.navbar {
  width: 100vw;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  box-sizing: border-box;
}
.navbar-logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #4f46e5;
  letter-spacing: 1px;
}
.navbar-links {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
}
.navbar-links li {
  font-size: 1rem;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
}
.navbar-links a, .logout-btn {
  text-decoration: none;
  color: #374151;
  font-weight: 500;
  transition: color 0.2s;
  padding-bottom: 2px;
  border-bottom: 2px solid transparent;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  margin: 0 0.2rem;
}
.navbar-links .active a,
.navbar-links li.active a {
  color: #4f46e5;
  border-bottom: 2px solid #4f46e5;
}
.navbar-links a:hover, .logout-btn:hover {
  color: #3730a3;
  border-bottom: 2px solid #3730a3;
}
@media (max-width: 900px) {
  .navbar {
    padding: 1rem 0.7rem;
  }
  .navbar-links {
    gap: 1rem;
  }
}
@media (max-width: 700px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem 0.5rem;
  }
  .navbar-logo {
    margin-bottom: 0.7rem;
  }
  .navbar-links {
    flex-direction: column;
    gap: 0.7rem;
    width: 100%;
    align-items: flex-start;
  }
  .navbar-links li {
    width: 100%;
    justify-content: flex-start;
  }
  .navbar-links a, .logout-btn {
    width: 100%;
    text-align: left;
    padding: 0.5rem 0;
    margin: 0;
    border-bottom: 2px solid transparent;
  }
}
`}</style>
    </nav>
  );
};

export default Navbar; 