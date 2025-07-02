import React from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <Navbar />
      <div className="landing-content">
        <h1>Smart Booking & Availability System</h1>
        <p className="landing-desc">
          Effortlessly manage your bookings, slots, and availability. Perfect for professionals like doctors, coaches, and freelancers.
        </p>
        <button className="cta-btn" onClick={() => navigate('/dashboard')}>Get Started</button>
      </div>
      <style>{`
.landing-container {
  min-height: 100vh;
  min-width: 100vw;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
}
.landing-content {
  background: #fff;
  padding: 2.5rem 2rem;
  border-radius: 18px;
  box-shadow: 0 2px 16px rgba(79,70,229,0.08);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  justify-content: center;
}
.landing-content h1 {
  color: #4f46e5;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.2rem;
  text-align: center;
}
.landing-desc {
  color: #64748b;
  font-size: 1.08rem;
  margin-bottom: 2rem;
  text-align: center;
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
  width: 100%;
  max-width: 200px;
  margin-bottom: 0.5rem;
}
.cta-btn:hover {
  background: #3730a3;
}
@media (max-width: 900px) {
  .landing-content {
    max-width: 95vw;
    padding: 1.2rem 0.5rem;
  }
  .cta-btn {
    max-width: 100%;
  }
}
@media (max-width: 600px) {
  .landing-content {
    padding: 1rem 0.2rem;
  }
  .cta-btn {
    font-size: 0.95rem;
    padding: 0.6rem 1.1rem;
  }
}
`}</style>
    </div>
  );
};

export default Landing; 