import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Booking.css';

const Booking = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="booking-container">
      <Navbar />
      <div className="booking-content">
        <h2>Book a Slot</h2>
        <div className="calendar-section">
          <Calendar
            onChange={setDate}
            value={date}
            className="booking-calendar"
          />
        </div>
        <div className="selected-date">
          Selected Date: <b>{date.toLocaleDateString()}</b>
        </div>
        <div className="slots-list">
          <h3>Available Slots</h3>
          <ul>
            <li>10:00 AM <button className="cta-btn book-btn">Book</button></li>
            <li>2:00 PM <button className="cta-btn book-btn">Book</button></li>
            <li>4:00 PM <button className="cta-btn book-btn">Book</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Booking; 