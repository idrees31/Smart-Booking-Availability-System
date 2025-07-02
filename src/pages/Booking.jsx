import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const selectedDateStr = formatDate(date);
  const slots = slotsByDate[selectedDateStr] || [];

  return (
    <div className="booking-container">
      <Navbar />
      <div className="booking-content">
        <h2>Book a Slot</h2>
        <p style={{ color: '#64748b', fontSize: '0.98rem', marginBottom: '1rem' }}>
          Select a date and choose an available slot to book.
        </p>
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
      <style>{`
.booking-container {
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
.booking-content {
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
.calendar-section {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 1.2rem;
}
.booking-calendar {
  border-radius: 12px;
  border: 1px solid #e0e7ff;
  box-shadow: 0 1px 6px rgba(79,70,229,0.04);
  font-family: inherit;
  width: 100%;
  max-width: 320px;
  background: #fff;
}
.selected-date {
  text-align: center;
  color: #4f46e5;
  font-weight: 500;
  margin-bottom: 1.2rem;
  font-size: 1.08rem;
}
/* Calendar color overrides */
.react-calendar__tile--active,
.react-calendar__tile--range,
.react-calendar__tile--rangeStart,
.react-calendar__tile--rangeEnd {
  background: #4f46e5 !important;
  color: #fff !important;
  border-radius: 8px;
}
.react-calendar__tile:enabled:hover,
.react-calendar__tile:enabled:focus {
  background: #e0e7ff !important;
  color: #3730a3 !important;
  border-radius: 8px;
}
.react-calendar__navigation button {
  color: #4f46e5;
  font-weight: bold;
}
.react-calendar {
  border: none;
  width: 100%;
  font-family: inherit;
}
.slots-list {
  width: 100%;
}
.slots-list h3 {
  color: #3730a3;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}
.slots-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.slots-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f1f5f9;
  border-radius: 8px;
  padding: 0.7rem 1rem;
  margin-bottom: 0.7rem;
  font-size: 1rem;
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
@media (max-width: 900px) {
  .booking-content {
    max-width: 95vw;
    padding: 1.2rem 0.5rem;
  }
  .cta-btn {
    max-width: 100%;
  }
}
@media (max-width: 600px) {
  .booking-content {
    padding: 1rem 0.2rem;
  }
  .placeholder-card {
    padding: 0.7rem 0.3rem;
    font-size: 0.95rem;
  }
  .slots-list li {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
`}</style>
    </div>
  );
};

export default Booking; 