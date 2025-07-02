import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
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
      <Navbar />
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
        <div className="testimonials-section">
          <h3>What our users say</h3>
          <div className="testimonial-card">
            <div className="testimonial-text">“{testimonials[testimonialIdx].text}”</div>
            <div className="testimonial-user">
              <span className="testimonial-name">{testimonials[testimonialIdx].name}</span>
              <span className="testimonial-profession">{testimonials[testimonialIdx].profession}</span>
            </div>
            <div className="testimonial-dots">
              {testimonials.map((_, idx) => (
                <span
                  key={idx}
                  className={idx === testimonialIdx ? 'dot active' : 'dot'}
                  onClick={() => setTestimonialIdx(idx)}
                ></span>
              ))}
            </div>
          </div>
        </div>
        <style>{`
.landing-container {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
}
.landing-content {
  background: #fff;
  padding: 4.5rem 2rem 2.5rem 2rem;
  border-radius: 18px;
  box-shadow: 0 2px 16px rgba(79,70,229,0.08);
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  justify-content: center;
  margin: 2.5rem auto 0 auto;
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
.testimonials-section {
  width: 100%;
  margin-top: 2.2rem;
  text-align: center;
}
.testimonials-section h3 {
  color: #3730a3;
  margin-bottom: 1.2rem;
  font-size: 1.1rem;
  font-weight: 700;
}
.testimonial-card {
  background: #e0e7ff;
  border-radius: 14px;
  padding: 1.3rem 1.2rem 1.1rem 1.2rem;
  box-shadow: 0 1px 6px rgba(79,70,229,0.04);
  margin: 0 auto;
  max-width: 350px;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadein 0.7s;
}
.testimonial-text {
  color: #3730a3;
  font-size: 1.08rem;
  margin-bottom: 0.7rem;
  font-style: italic;
}
.testimonial-user {
  color: #4f46e5;
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}
.testimonial-profession {
  color: #64748b;
  font-size: 0.97em;
  font-weight: 400;
  margin-left: 0.3rem;
}
.testimonial-dots {
  display: flex;
  gap: 0.4rem;
  margin-top: 0.2rem;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #c7d2fe;
  cursor: pointer;
  transition: background 0.2s;
}
.dot.active {
  background: #4f46e5;
}
@media (max-width: 900px) {
  .landing-content {
    max-width: 95vw;
    padding: 1.2rem 0.5rem;
  }
  .cta-btn {
    max-width: 100%;
  }
  .how-steps {
    gap: 0.7rem;
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
  .how-step {
    min-width: 90px;
    max-width: 100vw;
    padding: 0.7rem 0.5rem;
  }
  .testimonial-card {
    padding: 0.7rem 0.3rem 0.7rem 0.3rem;
    font-size: 0.95rem;
  }
}
`}</style>
      </div>
    </div>
  );
};

export default Landing; 