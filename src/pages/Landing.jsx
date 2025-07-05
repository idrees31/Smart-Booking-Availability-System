import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

const testimonials = [
  {
    name: 'Dr. Sarah Khan',
    text: 'This booking system has made my clinic so much more organized. My patients love the easy scheduling!',
    profession: 'Doctor',
  },
  {
    name: 'Coach Alex',
    text: 'I can finally manage all my sessions and clients in one place. Highly recommended!',
    profession: 'Fitness Coach',
  },
  {
    name: 'Ayesha R.',
    text: 'The reminders and calendar are a game changer for my freelance business.',
    profession: 'Freelancer',
  },
];

const howItWorks = [
  { icon: '📅', title: '1. Register', desc: 'Create your profile and set your available slots.' },
  { icon: '🗓️', title: '2. Book', desc: 'Clients pick a date and slot from your calendar.' },
  { icon: '🔔', title: '3. Get Notified', desc: 'Receive reminders and manage your bookings easily.' },
];

const AnimatedStat = ({ value, label }) => {
  const [count, setCount] = useState(0);
  React.useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;
    let increment = end > 100 ? Math.ceil(end / 100) : 1;
    let timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 18);
    return () => clearInterval(timer);
  }, [value]);
  return (
    <div className="stat-card-landing">
      <span className="stat-value-landing">{count}</span>
      <span className="stat-label-landing">{label}</span>
    </div>
  );
};

const Landing = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      setShowAuthModal(true);
    }
  };

  const handleAuthChoice = (choice) => {
    setShowAuthModal(false);
    navigate(choice === 'login' ? '/login' : '/signup');
  };

  return (
    <div className="landing-page-container">
      <div className="landing-content">
        <div className="hero-section">
          <div className="hero-icon">🚀</div>
          <h1 className="hero-title">Smart Booking</h1>
          <p className="hero-subtitle">
            The ultimate platform for seamless appointment scheduling and management. 
            Book your appointments with ease and manage your schedule like never before.
          </p>
          <div className="hero-features">
            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <span>Instant Booking</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📱</span>
              <span>Mobile Friendly</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔒</span>
              <span>Secure & Reliable</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🎯</span>
              <span>Smart Scheduling</span>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <button className="cta-button" onClick={handleGetStarted}>
            <span className="btn-icon">🎯</span>
            <span>Get Started</span>
          </button>
          <p className="cta-subtitle">
            Start managing your bookings in minutes
          </p>
        </div>

        <div className="features-section">
          <h2 className="section-title">Why Choose Smart Booking?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-card-icon">📅</div>
              <h3>Easy Scheduling</h3>
              <p>Book appointments with just a few clicks. Our intuitive interface makes scheduling effortless.</p>
            </div>
            <div className="feature-card">
              <div className="feature-card-icon">🔔</div>
              <h3>Smart Reminders</h3>
              <p>Never miss an appointment with our intelligent reminder system and notifications.</p>
            </div>
            <div className="feature-card">
              <div className="feature-card-icon">📊</div>
              <h3>Analytics Dashboard</h3>
              <p>Track your booking patterns and get insights into your scheduling efficiency.</p>
            </div>
            <div className="feature-card">
              <div className="feature-card-icon">🔄</div>
              <h3>Real-time Updates</h3>
              <p>Get instant updates on booking status and availability across all your devices.</p>
            </div>
          </div>
        </div>

        <div className="stats-section">
          <div className="stat-item">
            <div className="stat-number">1000+</div>
            <div className="stat-label">Happy Users</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">5000+</div>
            <div className="stat-label">Bookings Made</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">99%</div>
            <div className="stat-label">Satisfaction Rate</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Support Available</div>
          </div>
        </div>

        <div className="footer-section">
          <p className="footer-text">
            Ready to transform your booking experience? 
            <button className="footer-link-btn" onClick={handleGetStarted}> Sign up now</button> and get started!
          </p>
        </div>
      </div>

      {showAuthModal && (
        <div className="auth-modal-overlay" onClick={() => setShowAuthModal(false)}>
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
            <div className="auth-modal-header">
              <div className="auth-modal-icon">🔐</div>
              <h2>Welcome to Smart Booking</h2>
              <p>Choose how you'd like to get started</p>
            </div>
            
            <div className="auth-options">
              <div className="auth-option login-option" onClick={() => handleAuthChoice('login')}>
                <div className="option-icon">👋</div>
                <div className="option-content">
                  <h3>I have an account</h3>
                  <p>Welcome back! Sign in to access your dashboard and bookings.</p>
                </div>
                <div className="option-arrow">→</div>
              </div>
              
              <div className="auth-option signup-option" onClick={() => handleAuthChoice('signup')}>
                <div className="option-icon">🌟</div>
                <div className="option-content">
                  <h3>I'm new here</h3>
                  <p>Join us today! Create your account and start booking appointments.</p>
                </div>
                <div className="option-arrow">→</div>
              </div>
            </div>
            
            <div className="auth-modal-footer">
              <button className="cancel-btn" onClick={() => setShowAuthModal(false)}>
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}
      <style>{`
.landing-page-container {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.landing-page-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  pointer-events: none;
}
.landing-content {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 4rem 3rem;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  width: 90vw;
  max-width: 1000px;
  text-align: center;
  position: relative;
  z-index: 1;
  animation: slideUp 0.8s ease-out;
}
@keyframes slideUp {
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
.hero-section {
  margin-bottom: 3rem;
}
.hero-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  animation: float 3s ease-in-out infinite;
}
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
.hero-title {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}
.hero-subtitle {
  color: #64748b;
  font-size: 1.3rem;
  margin-bottom: 2rem;
  line-height: 1.6;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}
.hero-features {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}
.feature-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #374151;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.8rem 1.2rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}
.feature-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}
.feature-icon {
  font-size: 1.2rem;
}
.cta-section {
  margin-bottom: 4rem;
}
.cta-button {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  text-decoration: none;
  padding: 1.2rem 2.5rem;
  border-radius: 16px;
  font-size: 1.2rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
  transition: all 0.3s ease;
  margin-bottom: 1rem;
  border: none;
  cursor: pointer;
}
.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(16, 185, 129, 0.4);
}
.btn-icon {
  font-size: 1.4rem;
}
.cta-subtitle {
  color: #6b7280;
  font-size: 1rem;
  margin: 0;
}
.features-section {
  margin-bottom: 4rem;
}
.section-title {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}
.feature-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  transition: all 0.3s ease;
  text-align: center;
}
.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}
.feature-card-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  animation: bounce 2s infinite;
}
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}
.feature-card h3 {
  color: #1f2937;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
}
.feature-card p {
  color: #6b7280;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
}
.stats-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}
.stat-item {
  text-align: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}
.stat-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}
.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: #667eea;
  margin-bottom: 0.5rem;
  line-height: 1;
}
.stat-label {
  color: #6b7280;
  font-size: 0.95rem;
  font-weight: 600;
}
.footer-section {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
}
.footer-text {
  color: #6b7280;
  font-size: 1rem;
  margin: 0;
}
.footer-link-btn {
  background: none;
  border: none;
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
}
.footer-link-btn:hover {
  color: #5a67d8;
  text-decoration: underline;
}

/* Auth Modal Styles */
.auth-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.auth-modal {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
  width: 90vw;
  max-width: 600px;
  animation: slideInScale 0.4s ease-out;
}
@keyframes slideInScale {
  from { 
    transform: scale(0.8); 
    opacity: 0; 
  }
  to { 
    transform: scale(1); 
    opacity: 1; 
  }
}
.auth-modal-header {
  text-align: center;
  margin-bottom: 2.5rem;
}
.auth-modal-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  animation: bounce 2s infinite;
}
.auth-modal-header h2 {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}
.auth-modal-header p {
  color: #64748b;
  font-size: 1.1rem;
  margin: 0;
}
.auth-options {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}
.auth-option {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
}
.auth-option::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}
.auth-option:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  border-color: #667eea;
}
.auth-option:hover::before {
  opacity: 0.1;
}
.login-option {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-color: #0ea5e9;
}
.signup-option {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-color: #f59e0b;
}
.option-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
.option-content {
  flex: 1;
  text-align: left;
}
.option-content h3 {
  color: #1f2937;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.option-content p {
  color: #6b7280;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
}
.option-arrow {
  font-size: 1.5rem;
  color: #667eea;
  font-weight: 600;
  transition: transform 0.3s ease;
}
.auth-option:hover .option-arrow {
  transform: translateX(5px);
}
.auth-modal-footer {
  text-align: center;
}
.cancel-btn {
  background: none;
  border: none;
  color: #6b7280;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}
.cancel-btn:hover {
  background: #f3f4f6;
  color: #374151;
}

@media (max-width: 768px) {
  .landing-content {
    padding: 3rem 2rem;
    margin: 1rem;
  }
  .hero-title {
    font-size: 2.5rem;
  }
  .hero-subtitle {
    font-size: 1.1rem;
  }
  .hero-features {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  .feature-item {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .stats-section {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  .stat-item {
    padding: 1rem;
  }
  .stat-number {
    font-size: 2rem;
  }
  .cta-button {
    font-size: 1.1rem;
    padding: 1rem 2rem;
  }
  .section-title {
    font-size: 2rem;
  }
  .auth-modal {
    padding: 2rem;
    margin: 1rem;
  }
  .auth-option {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  .option-content {
    text-align: center;
  }
}
@media (max-width: 480px) {
  .landing-content {
    padding: 2rem 1.5rem;
  }
  .hero-title {
    font-size: 2rem;
  }
  .hero-icon {
    font-size: 3rem;
  }
  .hero-subtitle {
    font-size: 1rem;
  }
  .cta-button {
    font-size: 1rem;
    padding: 0.8rem 1.5rem;
  }
  .btn-icon {
    font-size: 1.2rem;
  }
  .stats-section {
    grid-template-columns: 1fr;
  }
  .section-title {
    font-size: 1.8rem;
  }
  .auth-modal {
    padding: 1.5rem;
  }
  .auth-modal-header h2 {
    font-size: 1.5rem;
  }
}
`}</style>
    </div>
  );
};

export default Landing; 