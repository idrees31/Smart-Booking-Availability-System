import React from 'react';
import Navbar from '../components/Navbar';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <h2>Welcome to Your Dashboard</h2>
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
          <div className="placeholder-card">Upcoming features: Calendar, Payments, Notifications...</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 