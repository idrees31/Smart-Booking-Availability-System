import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

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
      <style>{`
.landing-container {
  font-family: 'Segoe UI', Arial, sans-serif;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  min-height: 100vh;
  min-width: 100vw;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
}
body, html {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.landing-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  width: 100%;
  box-sizing: border-box;
  flex-shrink: 0;
}
.logo {
  font-size: 2rem;
  font-weight: bold;
  color: #4f46e5;
  letter-spacing: 1px;
}
.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
  flex-wrap: wrap;
}
.nav-links a {
  text-decoration: none;
  color: #374151;
  font-weight: 500;
  transition: color 0.2s;
}
.nav-links a:hover {
  color: #4f46e5;
}
.cta-btn {
  background: #4f46e5;
  color: #fff;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.cta-btn:hover {
  background: #3730a3;
}
.landing-header {
  text-align: center;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 0;
  padding: 2rem 1rem 2rem 1rem;
}
.landing-header h1 {
  font-size: 2.8rem;
  color: #1e293b;
  margin-bottom: 1rem;
  word-break: break-word;
}
.landing-header p {
  font-size: 1.3rem;
  color: #64748b;
  margin-bottom: 2rem;
  max-width: 600px;
}
.main-cta {
  font-size: 1.1rem;
  padding: 1rem 2.5rem;
  margin-top: 1rem;
  display: inline-block;
}
.landing-footer {
  background: #fff;
  text-align: center;
  padding: 1.2rem 0;
  color: #64748b;
  font-size: 1rem;
  box-shadow: 0 -2px 8px rgba(0,0,0,0.03);
  width: 100vw;
  box-sizing: border-box;
  flex-shrink: 0;
}
@media (min-width: 700px) {
  .landing-header h1 {
    font-size: 3.5rem;
  }
  .landing-header {
    min-height: 0;
    padding: 4rem 1rem 3rem 1rem;
  }
}
@media (max-width: 600px) {
  .landing-navbar {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  .nav-links {
    gap: 1rem;
  }
  .landing-header {
    padding: 1rem 0.5rem 1rem 0.5rem;
  }
}
`}</style>
    </div>
  );
};

export default Landing; 