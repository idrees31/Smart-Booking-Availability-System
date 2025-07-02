import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setDropdownOpen(false);
  };

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/profile', label: 'Profile' },
    { to: '/booking', label: 'Booking' },
    { to: '/admin', label: 'Admin' },
  ];

  return (
    <nav className="navbar-adv">
      <div className="navbar-adv-inner">
        <div className="navbar-logo-adv" onClick={() => navigate('/')}> 
          <span className="logo-accent">S</span>mart
          <span className="logo-accent">B</span>ooking
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span className={menuOpen ? 'bar open' : 'bar'}></span>
          <span className={menuOpen ? 'bar open' : 'bar'}></span>
          <span className={menuOpen ? 'bar open' : 'bar'}></span>
        </button>
        <ul className={`navbar-links-adv ${menuOpen ? 'open' : ''}`}>
          {navLinks.map(link => (
            <li key={link.to} className={location.pathname === link.to ? 'active' : ''}>
              <Link to={link.to} onClick={() => setMenuOpen(false)}>
                {link.label}
                <span className="underline"></span>
              </Link>
            </li>
          ))}
          {!isLoggedIn && (
            <li className={location.pathname === '/login' ? 'active' : ''}>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Login
                <span className="underline"></span>
              </Link>
            </li>
          )}
        </ul>
        <div className="navbar-profile-section">
          {isLoggedIn ? (
            <div className="profile-dropdown-wrapper">
              <div
                className="profile-avatar"
                tabIndex={0}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
              >
                <span role="img" aria-label="User">👤</span>
              </div>
              {dropdownOpen && (
                <div className="profile-dropdown">
                  <button onClick={() => { setDropdownOpen(false); navigate('/profile'); }}>Profile</button>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
      <style>{`
.navbar-adv {
  width: 100vw;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 100;
  background: rgba(255,255,255,0.7);
  backdrop-filter: blur(12px) saturate(1.5);
  box-shadow: 0 4px 24px 0 rgba(79,70,229,0.08), 0 1.5px 0 #e0e7ff;
  transition: background 0.3s, box-shadow 0.3s;
}
.navbar-adv-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.7rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}
.navbar-logo-adv {
  font-size: 1.5rem;
  font-weight: 800;
  color: #3730a3;
  letter-spacing: 1px;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  gap: 0.2rem;
}
.logo-accent {
  color: #4f46e5;
  font-size: 1.7rem;
  font-weight: 900;
  margin-right: 2px;
}
.hamburger {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 120;
}
.bar {
  width: 26px;
  height: 3px;
  background: #4f46e5;
  border-radius: 2px;
  transition: all 0.3s;
  display: block;
}
.bar.open:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.bar.open:nth-child(2) {
  opacity: 0;
}
.bar.open:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}
.navbar-links-adv {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
  transition: right 0.3s;
}
.navbar-links-adv li {
  position: relative;
  font-size: 1.08rem;
  font-weight: 500;
}
.navbar-links-adv a {
  color: #374151;
  text-decoration: none;
  padding: 0.2rem 0.5rem 0.2rem 0.5rem;
  position: relative;
  transition: color 0.2s;
  z-index: 1;
}
.navbar-links-adv li.active a,
.navbar-links-adv a:hover {
  color: #4f46e5;
}
.underline {
  display: block;
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 2.5px;
  background: linear-gradient(90deg, #6366f1 0%, #a5b4fc 100%);
  border-radius: 2px;
  transform: scaleX(0);
  transition: transform 0.25s;
  z-index: 0;
}
.navbar-links-adv li.active .underline,
.navbar-links-adv a:hover .underline {
  transform: scaleX(1);
}
.navbar-profile-section {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}
.profile-avatar {
  width: 38px;
  height: 38px;
  background: #e0e7ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  color: #4f46e5;
  cursor: pointer;
  border: 2px solid #c7d2fe;
  transition: border 0.2s;
  position: relative;
}
.profile-avatar:focus {
  outline: none;
  border: 2px solid #4f46e5;
}
.profile-dropdown-wrapper {
  position: relative;
}
.profile-dropdown {
  position: absolute;
  top: 48px;
  right: 0;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px 0 rgba(79,70,229,0.12);
  padding: 0.7rem 0.5rem;
  min-width: 120px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 200;
}
.profile-dropdown button {
  background: none;
  border: none;
  color: #4f46e5;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 0.7rem;
  border-radius: 8px;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s;
}
.profile-dropdown button:hover {
  background: #e0e7ff;
}
@media (max-width: 900px) {
  .navbar-adv-inner {
    padding: 0.7rem 0.7rem;
  }
  .navbar-links-adv {
    gap: 1rem;
  }
}
@media (max-width: 700px) {
  .navbar-adv-inner {
    padding: 0.7rem 0.2rem;
  }
  .navbar-links-adv {
    position: fixed;
    top: 64px;
    right: -100vw;
    flex-direction: column;
    background: rgba(255,255,255,0.95);
    box-shadow: 0 4px 24px 0 rgba(79,70,229,0.08);
    width: 70vw;
    max-width: 320px;
    height: calc(100vh - 64px);
    padding: 2rem 1.2rem 1.2rem 1.2rem;
    align-items: flex-start;
    gap: 1.2rem;
    z-index: 150;
    transition: right 0.3s;
  }
  .navbar-links-adv.open {
    right: 0;
  }
  .hamburger {
    display: flex;
  }
}
`}</style>
    </nav>
  );
};

export default Navbar; 