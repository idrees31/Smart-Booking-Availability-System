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
  const [selectedDate, setSelectedDate] = useState('');
  const [showConflictMessage, setShowConflictMessage] = useState(false);
  const [conflictDetails, setConflictDetails] = useState(null);

  const selectedDateStr = formatDate(date);
  const slots = slotsByDate[selectedDateStr] || [];
  const bookedForDate = bookedSlots[selectedDateStr] || [];

  // Check if a slot is already booked
  const isSlotBooked = (date, slot) => {
    return users.some(user => 
      user.bookingDate === date && user.bookingSlot === slot
    );
  };

  // Get conflicting user details
  const getConflictDetails = (date, slot) => {
    return users.find(user => 
      user.bookingDate === date && user.bookingSlot === slot
    );
  };

  const handleSlotSelect = (slot) => {
    const currentDateStr = formatDate(date);
    if (currentDateStr) {
      if (isSlotBooked(currentDateStr, slot)) {
        const conflictingUser = getConflictDetails(currentDateStr, slot);
        setConflictDetails({
          date: currentDateStr,
          slot: slot,
          user: conflictingUser
        });
        setShowConflictMessage(true);
        // Auto-hide after 5 seconds
        setTimeout(() => setShowConflictMessage(false), 5000);
      } else {
        setSelectedSlot(slot);
        setShowConflictMessage(false);
      }
    } else {
      setSelectedSlot(slot);
    }
  };

  const handleDateSelect = (date) => {
    const dateStr = formatDate(date);
    setSelectedDate(dateStr);
    setDate(date);
    // Clear selected slot if it's now booked
    if (selectedSlot && isSlotBooked(dateStr, selectedSlot)) {
      setSelectedSlot('');
    }
  };

  const handleBooking = () => {
    const currentDateStr = formatDate(date);
    if (!currentDateStr || !selectedSlot) {
      return;
    }

    if (isSlotBooked(currentDateStr, selectedSlot)) {
      const conflictingUser = getConflictDetails(currentDateStr, selectedSlot);
      setConflictDetails({
        date: currentDateStr,
        slot: selectedSlot,
        user: conflictingUser
      });
      setShowConflictMessage(true);
      setTimeout(() => setShowConflictMessage(false), 5000);
      return;
    }

    // Proceed with booking
    setUsers(prev => {
      const updated = [...prev];
      updated[updated.length - 1] = {
        ...updated[updated.length - 1],
        bookingDate: currentDateStr,
        bookingSlot: selectedSlot,
      };
      return updated;
    });
    navigate('/dashboard');
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
            bookingDate: selectedDate,
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
        <div className="booking-header">
          <div className="header-icon">📅</div>
          <h2>Book Your Perfect Slot</h2>
          <p className="header-subtitle">
            Choose your preferred date and time to secure your appointment
          </p>
        </div>

        {successMsg && (
          <div className="success-message">
            <div className="success-icon">✅</div>
            <span>{successMsg}</span>
          </div>
        )}

        <div className="booking-grid">
          <div className="calendar-section">
            <div className="section-header">
              <h3>📅 Select Date</h3>
              <p>Pick a date from the calendar below</p>
            </div>
            <div className="calendar-wrapper">
              <Calendar
                onChange={handleDateSelect}
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
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      }}></span>
                    </div>
                  );
                }}
              />
            </div>
            <div className="selected-date-display">
              <span className="date-label">Selected Date:</span>
              <span className="date-value">{date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
          </div>

          <div className="slots-section">
            <div className="section-header">
              <h3>⏰ Available Slots</h3>
              <p>Choose your preferred time slot</p>
            </div>
            
            {slots.length > 0 ? (
              allBooked ? (
                <div className="no-slots-message">
                  <div className="no-slots-icon">😔</div>
                  <h4>All Slots Booked</h4>
                  <p>This date is fully booked. Please try another date.</p>
                </div>
              ) : (
                <div className="slots-grid">
                  {slots.map((slot, idx) => (
                    <div key={slot + idx} className="slot-card">
                      {bookedForDate.includes(slot) || selectedSlot === slot ? (
                        <div className="slot-booked">
                          <div className="slot-time">{slot}</div>
                          <div className="slot-status">Booked</div>
                        </div>
                      ) : (
                        <button 
                          className="slot-available" 
                          onClick={() => handleSlotSelect(slot)}
                        >
                          <div className="slot-time">{slot}</div>
                          <div className="slot-action">Book Now</div>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="no-slots-message">
                <div className="no-slots-icon">📅</div>
                <h4>No Slots Available</h4>
                <p>No slots are available for this date. Please select another date.</p>
              </div>
            )}
          </div>
        </div>

        {selectedSlot && (
          <div className="booking-summary">
            <div className="summary-content">
              <div className="summary-icon">🎯</div>
              <div className="summary-details">
                <h4>Booking Summary</h4>
                <p>Date: {date.toLocaleDateString()}</p>
                <p>Time: {selectedSlot}</p>
              </div>
            </div>
            <button className="finish-btn" onClick={handleBooking}>
              Complete Booking
            </button>
          </div>
        )}

        {showFeedback && (
          <div className="feedback-modal-bg">
            <div className="feedback-modal">
              <div className="feedback-header">
                <div className="feedback-icon">⭐</div>
                <h3>Rate Your Experience</h3>
                <p>Help us improve by sharing your feedback</p>
              </div>
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
                <div className="rating-labels">
                  <span>Poor</span>
                  <span>Excellent</span>
                </div>
                <textarea
                  className="feedback-comment"
                  placeholder="Share your experience (optional)"
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  rows={3}
                />
                <button className="submit-feedback-btn" type="submit" disabled={rating === 0 || feedbackSubmitted}>
                  {feedbackSubmitted ? 'Thank you!' : 'Submit Feedback'}
                </button>
              </form>
            </div>
          </div>
        )}

        {showConflictMessage && conflictDetails && (
          <div className="conflict-message">
            <div className="conflict-icon">⚠️</div>
            <div className="conflict-content">
              <h3>Slot Already Booked!</h3>
              <p>
                <strong>{conflictDetails.slot}</strong> on <strong>{conflictDetails.date}</strong> 
                is already booked by <strong>{conflictDetails.user.name}</strong>.
              </p>
              <p className="conflict-suggestion">
                Please choose a different time slot or date.
              </p>
            </div>
            <button 
              className="conflict-close"
              onClick={() => setShowConflictMessage(false)}
            >
              ×
            </button>
          </div>
        )}
      </div>
      <style>{`
.booking-container {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}
.booking-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  pointer-events: none;
}
.booking-content {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 4.5rem 2rem 2.5rem 2rem;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  width: 90vw;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  justify-content: center;
  margin: 2.5rem auto 0 auto;
  position: relative;
  z-index: 1;
}
.booking-header {
  text-align: center;
  margin-bottom: 3rem;
}
.header-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  animation: bounce 2s infinite;
}
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}
.booking-header h2 {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}
.header-subtitle {
  color: #64748b;
  font-size: 1.1rem;
  margin: 0;
}
.success-message {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border-radius: 16px;
  padding: 1rem 1.5rem;
  margin-bottom: 2rem;
  font-weight: 500;
  text-align: center;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
  animation: slideIn 0.5s ease-out;
}
@keyframes slideIn {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
.success-icon {
  font-size: 1.2rem;
}
.booking-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  width: 100%;
  margin-bottom: 2rem;
}
.calendar-section, .slots-section {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  border: 1px solid rgba(255,255,255,0.2);
}
.section-header {
  text-align: center;
  margin-bottom: 1.5rem;
}
.section-header h3 {
  color: #1f2937;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.section-header p {
  color: #6b7280;
  font-size: 0.95rem;
  margin: 0;
}
.calendar-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}
.booking-calendar {
  border-radius: 16px;
  border: 2px solid #e5e7eb;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  font-family: inherit;
  width: 100%;
  max-width: 350px;
  background: white;
  overflow: hidden;
}
.selected-date-display {
  text-align: center;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 12px;
  padding: 1rem;
  border: 1px solid #e2e8f0;
}
.date-label {
  display: block;
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.3rem;
}
.date-value {
  display: block;
  color: #1f2937;
  font-size: 1.1rem;
  font-weight: 600;
}
.slots-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
}
.slot-card {
  transition: all 0.3s ease;
}
.slot-available {
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 1.2rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  font-weight: 500;
}
.slot-available:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
}
.slot-booked {
  width: 100%;
  background: #f3f4f6;
  color: #9ca3af;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.2rem 1rem;
  text-align: center;
  cursor: not-allowed;
}
.slot-time {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
}
.slot-action {
  font-size: 0.9rem;
  opacity: 0.9;
}
.slot-status {
  font-size: 0.9rem;
  font-weight: 500;
}
.no-slots-message {
  text-align: center;
  padding: 3rem 2rem;
  color: #6b7280;
}
.no-slots-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}
.no-slots-message h4 {
  color: #374151;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}
.no-slots-message p {
  margin: 0;
  font-size: 0.95rem;
}
.booking-summary {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border: 2px solid #f59e0b;
  border-radius: 16px;
  padding: 1.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  animation: slideIn 0.5s ease-out;
}
.summary-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.summary-icon {
  font-size: 2rem;
}
.summary-details h4 {
  color: #92400e;
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}
.summary-details p {
  color: #a16207;
  margin: 0.2rem 0;
  font-size: 0.95rem;
}
.finish-btn {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}
.finish-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
}

/* Calendar styles */
.react-calendar__tile--active,
.react-calendar__tile--range,
.react-calendar__tile--rangeStart,
.react-calendar__tile--rangeEnd {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: #fff !important;
  border-radius: 8px;
}
.react-calendar__tile:enabled:hover,
.react-calendar__tile:enabled:focus {
  background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%) !important;
  color: #3730a3 !important;
  border-radius: 8px;
}
.react-calendar__navigation button {
  color: #667eea;
  font-weight: bold;
}
.react-calendar {
  border: none;
  width: 100%;
  font-family: inherit;
}
.booking-calendar .react-calendar__tile {
  position: relative;
  padding-bottom: 1.2em;
}

/* Feedback modal styles */
.feedback-modal-bg {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(10px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.feedback-modal {
  background: white;
  border-radius: 24px;
  box-shadow: 0 25px 50px rgba(0,0,0,0.25);
  padding: 2.5rem 2rem;
  max-width: 450px;
  width: 95vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: modalSlideIn 0.3s ease-out;
}
@keyframes modalSlideIn {
  from { opacity: 0; transform: scale(0.9) translateY(-20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
.feedback-header {
  text-align: center;
  margin-bottom: 2rem;
}
.feedback-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}
.feedback-header h3 {
  color: #1f2937;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
}
.feedback-header p {
  color: #6b7280;
  margin: 0;
  font-size: 0.95rem;
}
.star-rating {
  display: flex;
  gap: 0.5rem;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  cursor: pointer;
}
.star {
  color: #e5e7eb;
  transition: all 0.3s ease;
}
.star:hover {
  color: #fbbf24;
  transform: scale(1.1);
}
.star.filled {
  color: #fbbf24;
  animation: starPop 0.3s ease-out;
}
@keyframes starPop {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}
.rating-labels {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1.5rem;
  font-size: 0.85rem;
  color: #6b7280;
}
.feedback-comment {
  width: 100%;
  border-radius: 12px;
  border: 2px solid #e5e7eb;
  padding: 1rem;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  resize: none;
  outline: none;
  transition: border 0.3s ease;
  font-family: inherit;
}
.feedback-comment:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}
.submit-feedback-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  width: 100%;
}
.submit-feedback-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}
.submit-feedback-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

@media (max-width: 900px) {
  .booking-content {
    max-width: 98vw;
    padding: 1.2rem 0.5rem;
  }
  .booking-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .booking-header h2 {
    font-size: 2rem;
  }
  .booking-summary {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
@media (max-width: 600px) {
  .booking-content {
    padding: 1rem 0.2rem;
  }
  .booking-header h2 {
    font-size: 1.8rem;
  }
  .header-icon {
    font-size: 2.5rem;
  }
  .slots-grid {
    grid-template-columns: 1fr;
  }
  .feedback-modal {
    padding: 2rem 1.5rem;
  }
  .star-rating {
    font-size: 2rem;
  }
}

.conflict-message {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border: 2px solid #f59e0b;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(245, 158, 11, 0.3);
  z-index: 1000;
  max-width: 500px;
  width: 90vw;
  animation: slideInScale 0.5s ease-out;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}
@keyframes slideInScale {
  from { 
    transform: translate(-50%, -50%) scale(0.8); 
    opacity: 0; 
  }
  to { 
    transform: translate(-50%, -50%) scale(1); 
    opacity: 1; 
  }
}
.conflict-icon {
  font-size: 2rem;
  flex-shrink: 0;
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}
.conflict-content {
  flex: 1;
}
.conflict-content h3 {
  color: #92400e;
  margin: 0 0 0.5rem 0;
  font-size: 1.3rem;
  font-weight: 700;
}
.conflict-content p {
  color: #92400e;
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  line-height: 1.5;
}
.conflict-suggestion {
  color: #b45309;
  font-style: italic;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}
.conflict-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #92400e;
  cursor: pointer;
  padding: 0.2rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  flex-shrink: 0;
}
.conflict-close:hover {
  background: rgba(146, 64, 14, 0.1);
  transform: scale(1.1);
}
`}</style>
    </div>
  );
};

export default Booking; 