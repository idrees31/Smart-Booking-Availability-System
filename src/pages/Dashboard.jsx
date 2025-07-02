import React from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  // Fake bookings array for placeholder
  const bookings = [];

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <h2>Welcome to Your Dashboard</h2>
        <p style={{ color: '#64748b', fontSize: '0.98rem', marginBottom: '1rem' }}>
          Use the buttons below to manage your profile, book slots, or view your bookings.
        </p>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <button className="cta-btn" onClick={() => navigate('/profile')}>Profile</button>
          <button className="cta-btn" onClick={() => navigate('/booking')}>Book a Slot</button>
        </div>
        <div className="dashboard-summary">
          <div className="summary-card">
            <h3>Bookings</h3>
            <p>0</p>
          </div>
          <div className="summary-card">
            <h3>Available Slots</h3>
            <p>0</p>
          </div>
        </div>
        <div className="dashboard-placeholders">
          {bookings.length === 0 && (
            <div className="placeholder-card">No bookings yet. Book your first slot!</div>
          )}
          <div className="placeholder-card">Upcoming features: Calendar, Payments, Notifications...</div>
        </div>
      </div>
      <style>{`
.dashboard-container {
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
.dashboard-content {
  background: #fff;
  padding: 2.5rem 2rem;
  border-radius: 18px;
  box-shadow: 0 2px 16px rgba(79,70,229,0.08);
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  justify-content: center;
}
.dashboard-content h2 {
  color: #4f46e5;
  margin-bottom: 2rem;
  font-size: 1.7rem;
  font-weight: bold;
}
.dashboard-summary {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
}
.summary-card {
  background: #f1f5f9;
  border-radius: 12px;
  box-shadow: 0 1px 6px rgba(79,70,229,0.04);
  padding: 1.2rem 1.5rem;
  min-width: 120px;
  text-align: center;
  flex: 1 1 120px;
  box-sizing: border-box;
}
.summary-card h3 {
  color: #3730a3;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}
.summary-card p {
  color: #4f46e5;
  font-size: 1.3rem;
  font-weight: bold;
}
.dashboard-placeholders {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.placeholder-card {
  background: #e0e7ff;
  color: #3730a3;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  box-sizing: border-box;
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
  .dashboard-content {
    max-width: 95vw;
    padding: 1.2rem 0.5rem;
  }
  .dashboard-summary {
    flex-direction: column;
    gap: 1rem;
  }
  .cta-btn {
    max-width: 100%;
  }
}
@media (max-width: 600px) {
  .dashboard-content {
    padding: 1rem 0.2rem;
  }
  .summary-card {
    padding: 1rem 0.5rem;
    min-width: 0;
  }
  .placeholder-card {
    padding: 0.7rem 0.3rem;
    font-size: 0.95rem;
  }
}
`}</style>
    </div>
  );
};

export default Dashboard; 