import React, { useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import { UsersContext } from '../App';

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
  const [bookedSlots, setBookedSlots] = useState({}); // { 'YYYY-MM-DD': ['slot', ...] }
  const [successMsg, setSuccessMsg] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const navigate = useNavigate();
  const { users, setUsers } = useContext(UsersContext);

  const selectedDateStr = formatDate(date);
  const slots = slotsByDate[selectedDateStr] || [];
  const bookedForDate = bookedSlots[selectedDateStr] || [];

  const handleBook = (slot) => {
    setBookedSlots((prev) => ({
      ...prev,
      [selectedDateStr]: [...(prev[selectedDateStr] || []), slot],
    }));
    setSelectedSlot(slot);
    setSuccessMsg(`You have booked ${slot} on ${date.toLocaleDateString()}`);
    setTimeout(() => setSuccessMsg(''), 2500);
  };

  const allBooked = slots.length > 0 && slots.every((slot) => bookedForDate.includes(slot));

  const handleFinished = () => {
    // Update the last registered user with booking info
    if (selectedSlot) {
      setUsers(prev => {
        const updated = [...prev];
        if (updated.length > 0) {
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            bookingDate: selectedDateStr,
            bookingSlot: selectedSlot,
          };
        }
        return updated;
      });
    }
    setShowFeedback(true);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    setUsers(prev => {
      const updated = [...prev];
      if (updated.length > 0) {
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          feedback: { rating, comment },
        };
      }
      return updated;
    });
    setFeedbackSubmitted(true);
    setTimeout(() => {
      setShowFeedback(false);
      setFeedbackSubmitted(false);
      setRating(0);
      setComment('');
      navigate('/dashboard');
    }, 1200);
  };

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
            tileContent={({ date }) => {
              const dateStr = formatDate(date);
              const slots = slotsByDate[dateStr] || [];
              const booked = bookedSlots[dateStr] || [];
              if (!slots.length) return null;
              let color = '#22c55e'; // green
              if (booked.length === slots.length) color = '#dc2626'; // red
              else if (booked.length > 0) color = '#eab308'; // yellow
              return (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                  <span style={{
                    display: 'inline-block',
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: color,
                  }}></span>
                </div>
              );
            }}
          />
        </div>
        <div className="selected-date">
          Selected Date: <b>{date.toLocaleDateString()}</b>
        </div>
        {successMsg && (
          <div className="placeholder-card" style={{ color: '#16a34a', marginBottom: '1rem' }}>{successMsg}</div>
        )}
        <div className="slots-list">
          <h3>Available Slots</h3>
          {slots.length > 0 ? (
            allBooked ? (
              <div className="placeholder-card">All slots are booked for this date.</div>
            ) : (
              <ul>
                {slots.map((slot, idx) => (
                  <li key={slot + idx}>
                    {slot}{' '}
                    {bookedForDate.includes(slot) || selectedSlot === slot ? (
                      <span style={{ color: '#64748b', fontWeight: 500 }}>Booked</span>
                    ) : (
                      <button className="cta-btn" onClick={() => handleBook(slot)}>Book</button>
                    )}
                  </li>
                ))}
              </ul>
            )
          ) : (
            <div className="placeholder-card" style={{ color: '#64748b', textAlign: 'center', margin: '1rem 0' }}>
              No slots available for this date.
            </div>
          )}
        </div>
        <button className="cta-btn finished-btn" style={{marginTop: '2rem'}} onClick={handleFinished} disabled={!selectedSlot}>Finished</button>
        {showFeedback && (
          <div className="feedback-modal-bg">
            <div className="feedback-modal">
              <h3>Rate Your Booking</h3>
              <form onSubmit={handleFeedbackSubmit}>
                <div className="star-rating">
                  {[1,2,3,4,5].map(star => (
                    <span
                      key={star}
                      className={star <= rating ? 'star filled' : 'star'}
                      onClick={() => setRating(star)}
                      role="button"
                      tabIndex={0}
                    >&#9733;</span>
                  ))}
                </div>
                <textarea
                  className="feedback-comment"
                  placeholder="Leave a comment (optional)"
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  rows={3}
                />
                <button className="cta-btn" type="submit" disabled={rating === 0 || feedbackSubmitted}>
                  {feedbackSubmitted ? 'Thank you!' : 'Submit Feedback'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <style>{`
.booking-container {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
}
.booking-content {
  background: #fff;
  padding: 4.5rem 2rem 2.5rem 2rem;
  border-radius: 18px;
  box-shadow: 0 2px 16px rgba(79,70,229,0.08);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  justify-content: center;
  margin: 2.5rem auto 0 auto;
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
.finished-btn {
  margin-top: 2rem;
  background: #16a34a;
}
.finished-btn:disabled {
  background: #a7f3d0;
  color: #64748b;
  cursor: not-allowed;
}
.finished-btn:hover:enabled {
  background: #15803d;
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
.booking-calendar .react-calendar__tile {
  position: relative;
  padding-bottom: 1.2em;
}
.feedback-modal-bg {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(30,41,59,0.18);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.feedback-modal {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 32px rgba(79,70,229,0.13);
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  max-width: 350px;
  width: 95vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: modal-fadein 0.3s;
}
@keyframes modal-fadein {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.feedback-modal h3 {
  color: #4f46e5;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: 700;
}
.star-rating {
  display: flex;
  gap: 0.3rem;
  font-size: 2rem;
  margin-bottom: 1rem;
  cursor: pointer;
}
.star {
  color: #e0e7ff;
  transition: color 0.2s;
}
.star.filled {
  color: #facc15;
}
.feedback-comment {
  width: 100%;
  border-radius: 8px;
  border: 1px solid #c7d2fe;
  padding: 0.7rem 1rem;
  font-size: 1rem;
  margin-bottom: 1.1rem;
  resize: none;
  outline: none;
  transition: border 0.2s;
}
.feedback-comment:focus {
  border: 1.5px solid #4f46e5;
}
`}</style>
    </div>
  );
};

export default Booking; 