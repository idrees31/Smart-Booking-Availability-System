import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Booking.css';

// Example slots mapping (in a real app, this would come from the backend)
const slotsByDate = {
  // Format: 'YYYY-MM-DD': [slot, slot, ...]
  '2025-07-03': ['10:00 AM', '2:00 PM', '4:00 PM'],
  '2025-07-04': ['9:00 AM', '1:00 PM'],
  '2025-07-05': ['11:00 AM', '3:00 PM', '5:00 PM'],
};

function formatDate(date) {
  // Returns YYYY-MM-DD
  return date.toISOString().split('T')[0];
}

const Booking = () => {
  const [date, setDate] = useState(new Date());
  const selectedDateStr = formatDate(date);
  const slots = slotsByDate[selectedDateStr] || [];

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
          {slots.length > 0 ? (
            <ul>
              {slots.map((slot, idx) => (
                <li key={slot + idx}>
                  {slot} <button className="cta-btn book-btn">Book</button>
                </li>
              ))}
            </ul>
          ) : (
            <div style={{ color: '#64748b', textAlign: 'center', margin: '1rem 0' }}>
              No slots available for this date.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking; 