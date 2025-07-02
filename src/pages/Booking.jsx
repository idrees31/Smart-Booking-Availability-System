import React from 'react';
import Navbar from '../components/Navbar';
import './Booking.css';

const Booking = () => {
  return (
    <div className="booking-container">
      <Navbar />
      <div className="booking-content">
        <h2>Book a Slot</h2>
        <div className="calendar-placeholder">
          <span>Calendar will go here</span>
        </div>
        <div className="slots-list">
          <h3>Available Slots</h3>
          <ul>
            <li>Monday 10:00 AM <button className="cta-btn book-btn">Book</button></li>
            <li>Tuesday 2:00 PM <button className="cta-btn book-btn">Book</button></li>
            <li>Wednesday 4:00 PM <button className="cta-btn book-btn">Book</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Booking; 