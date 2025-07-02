import React, { useContext, useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { UsersContext } from '../App';

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
  useEffect(() => {
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
  const navigate = useNavigate();
  const { users } = useContext(UsersContext);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  // Calculate stats
  const totalUsers = users.length;
  const totalBookings = users.filter(u => u.bookingDate && u.bookingSlot).length;
  const totalFeedback = users.filter(u => u.feedback).length;

  // Carousel auto-advance
  useEffect(() => {
    const timer = setTimeout(() => {
      setTestimonialIdx(idx => (idx + 1) % testimonials.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [testimonialIdx]);

  return (
    <div className="landing-container">
      {/* <Navbar /> */}
      <div className="landing-content">
        <h1>Smart Booking & Availability System</h1>
        <p className="landing-desc">
          Effortlessly manage your bookings, slots, and availability. Perfect for professionals like doctors, coaches, and freelancers.
        </p>
        <div className="stats-row">
          <AnimatedStat value={totalUsers} label="Users" />
          <AnimatedStat value={totalBookings} label="Bookings" />
          <AnimatedStat value={totalFeedback} label="Feedbacks" />
        </div>
        <button className="cta-btn" onClick={() => navigate('/dashboard')}>Get Started</button>
        <div className="how-section">
          <h3>How it works</h3>
          <div className="how-steps">
            {howItWorks.map((step, idx) => (
              <div className="how-step" key={idx} style={{ animationDelay: `${idx * 0.12}s` }}>
                <span className="how-icon">{step.icon}</span>
                <span className="how-title">{step.title}</span>
                <span className="how-desc">{step.desc}</span>
              </div>
            ))}
          </div>
        </div>
        <style>{`
.landing-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}
.landing-content {
  background: #fff;
  padding: 5.5rem 3.5rem 3.5rem 3.5rem;
  border-radius: 22px;
  box-shadow: 0 2px 24px rgba(79,70,229,0.10);
  width: 96vw;
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  justify-content: center;
  animation: fadein 0.7s;
}
@keyframes fadein {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
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
.stats-row {
  display: flex;
  gap: 1.2rem;
  margin-bottom: 2rem;
  width: 100%;
  justify-content: center;
}
.stat-card-landing {
  background: #e0e7ff;
  color: #3730a3;
  border-radius: 10px;
  padding: 1rem 1.5rem;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 600;
  min-width: 80px;
  box-shadow: 0 1px 6px rgba(79,70,229,0.04);
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadein 0.7s;
}
.stat-value-landing {
  font-size: 1.5rem;
  color: #4f46e5;
  font-weight: 700;
}
.stat-label-landing {
  font-size: 1rem;
  color: #64748b;
  font-weight: 500;
}
.how-section {
  width: 100%;
  margin: 2.2rem 0 1.5rem 0;
  text-align: center;
}
.how-section h3 {
  color: #3730a3;
  margin-bottom: 1.2rem;
  font-size: 1.1rem;
  font-weight: 700;
}
.how-steps {
  display: flex;
  gap: 1.2rem;
  justify-content: center;
  flex-wrap: wrap;
}
.how-step {
  background: #f1f5f9;
  border-radius: 12px;
  padding: 1.1rem 1.2rem;
  min-width: 120px;
  max-width: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 1px 6px rgba(79,70,229,0.04);
  animation: fadein 0.7s;
  transition: transform 0.2s, box-shadow 0.2s;
}
.how-step:hover {
  transform: translateY(-4px) scale(1.04);
  box-shadow: 0 4px 16px rgba(79,70,229,0.10);
}
.how-icon {
  font-size: 2.1rem;
  margin-bottom: 0.5rem;
}
.how-title {
  color: #4f46e5;
  font-weight: 700;
  margin-bottom: 0.2rem;
}
.how-desc {
  color: #64748b;
  font-size: 0.98rem;
}
.cta-btn {
  background: linear-gradient(90deg, #6366f1 0%, #4f46e5 100%);
  color: #fff;
  border: none;
  padding: 0.9rem 2.2rem;
  border-radius: 25px;
  font-size: 1.15rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
  width: auto;
  max-width: 240px;
  margin-bottom: 0.5rem;
  box-shadow: 0 4px 16px rgba(79,70,229,0.10);
  letter-spacing: 0.5px;
}
.cta-btn:hover {
  background: linear-gradient(90deg, #4f46e5 0%, #6366f1 100%);
  box-shadow: 0 8px 24px rgba(79,70,229,0.13);
  transform: translateY(-2px) scale(1.04);
}
@media (max-width: 1100px) {
  .landing-content {
    max-width: 99vw;
    padding: 2.2rem 0.7rem;
  }
}
@media (max-width: 700px) {
  .landing-content {
    padding: 1.2rem 0.2rem;
    margin: 1.2rem auto 0 auto;
  }
}
`}</style>
      </div>
    </div>
  );
};

export default Landing; 