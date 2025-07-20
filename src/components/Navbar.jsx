import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Navbar = () => {
  const location = useLocation();
  const { isLoggedIn, logout, isAdmin } = useAuth();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/" className="nav-brand">
          <span className="brand-icon">🚀</span>
          <span className="brand-text">Smart Booking</span>
        </Link>
        
        <div className="nav-links">
          <Link 
            to="/dashboard" 
            className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
          >
            <span className="link-icon">📊</span>
            <span>Dashboard</span>
          </Link>
          
          {!isLoggedIn ? (
            <>
              <Link 
                to="/login" 
                className={`nav-link ${isActive('/login') ? 'active' : ''}`}
              >
                <span className="link-icon">🔐</span>
                <span>Login</span>
              </Link>
              <Link 
                to="/signup" 
                className={`nav-link ${isActive('/signup') ? 'active' : ''}`}
              >
                <span className="link-icon">🌟</span>
                <span>Sign Up</span>
              </Link>
            </>
          ) : (
            <>
              <Link 
                to="/profile" 
                className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
              >
                <span className="link-icon">👤</span>
                <span>Profile</span>
              </Link>
              <Link 
                to="/booking" 
                className={`nav-link ${isActive('/booking') ? 'active' : ''}`}
              >
                <span className="link-icon">📅</span>
                <span>Book</span>
              </Link>
              {isAdmin() && (
                <Link 
                  to="/admin" 
                  className={`nav-link admin-link ${isActive('/admin') ? 'active' : ''}`}
                >
                  <span className="link-icon">🛡️</span>
                  <span>Admin</span>
                </Link>
              )}
              <button onClick={logout} className="nav-link logout-btn">
                <span className="link-icon">🚪</span>
                <span>Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
      <style>{`
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  animation: slideDown 0.5s ease-out;
}
@keyframes slideDown {
  from { transform: translateY(-100%); }
  to { transform: translateY(0); }
}
.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}
.nav-brand {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  text-decoration: none;
  color: #1f2937;
  font-weight: 700;
  font-size: 1.3rem;
  transition: all 0.3s ease;
}
.nav-brand:hover {
  transform: translateY(-1px);
  text-decoration: none;
  color: #667eea;
}
.brand-icon {
  font-size: 1.5rem;
  animation: bounce 2s infinite;
}
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-3px); }
  60% { transform: translateY(-1px); }
}
.brand-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.nav-links {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  text-decoration: none;
  color: #6b7280;
  font-weight: 500;
  font-size: 0.95rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}
.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 12px;
  z-index: -1;
}
.nav-link:hover {
  color: white;
  transform: translateY(-2px);
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}
.nav-link:hover::before {
  opacity: 1;
}
.nav-link.active {
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}
.nav-link.active::before {
  opacity: 1;
}
.admin-link {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
}
.admin-link:hover {
  background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(245, 158, 11, 0.4);
}
.admin-link.active {
  background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
}
.link-icon {
  font-size: 1.1rem;
  transition: transform 0.3s ease;
}
.nav-link:hover .link-icon {
  transform: scale(1.1);
}
.logout-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
}
.logout-btn:hover {
  color: #dc2626;
}
.logout-btn:hover::before {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
}

@media (max-width: 768px) {
  .nav-content {
    padding: 0 1rem;
  }
  .nav-links {
    gap: 0.5rem;
  }
  .nav-link {
    padding: 0.5rem 0.8rem;
    font-size: 0.9rem;
  }
  .brand-text {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .nav-links {
    gap: 0.3rem;
  }
  .nav-link {
    padding: 0.4rem 0.6rem;
    font-size: 0.8rem;
  }
  .link-icon {
    font-size: 1rem;
  }
  .brand-icon {
    font-size: 1.3rem;
  }
  .brand-text {
    font-size: 1rem;
  }
}
`}</style>
    </nav>
  );
};

export default Navbar; 