import React, { useContext, useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { UsersContext } from '../App';
import { useAuth } from '../components/AuthContext';

function isFutureOrToday(dateStr) {
  if (!dateStr) return false;
  const today = new Date();
  const d = new Date(dateStr);
  today.setHours(0,0,0,0);
  d.setHours(0,0,0,0);
  return d >= today;
}
function isPast(dateStr) {
  if (!dateStr) return false;
  const today = new Date();
  const d = new Date(dateStr);
  today.setHours(0,0,0,0);
  d.setHours(0,0,0,0);
  return d < today;
}
function isTodayOrTomorrow(dateStr) {
  if (!dateStr) return false;
  const today = new Date();
  const d = new Date(dateStr);
  today.setHours(0,0,0,0);
  d.setHours(0,0,0,0);
  const diff = (d - today) / (1000 * 60 * 60 * 24);
  return diff === 0 || diff === 1;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { users } = useContext(UsersContext);
  const { isLoggedIn } = useAuth();
  const [showNotif, setShowNotif] = useState(true);

  // Simulate current user by email (in real app, use auth user info)
  // For demo, use the last registered user if logged in
  const currentUser = isLoggedIn && users.length > 0 ? users[users.length - 1] : null;

  // Upcoming bookings: users with a booking date today or in the future
  const upcoming = users
    .filter(u => u.bookingDate && u.bookingSlot && isFutureOrToday(u.bookingDate))
    .sort((a, b) => new Date(a.bookingDate) - new Date(b.bookingDate));

  // Booking history: for current user, bookings in the past
  const history = currentUser && currentUser.bookingDate && currentUser.bookingSlot && isPast(currentUser.bookingDate)
    ? [currentUser]
    : [];

  // Notification: if current user has a booking today or tomorrow
  const hasUpcomingSoon = currentUser && currentUser.bookingDate && currentUser.bookingSlot && isTodayOrTomorrow(currentUser.bookingDate);

  // Auto-hide notification after 8 seconds
  useEffect(() => {
    if (hasUpcomingSoon && showNotif) {
      const timer = setTimeout(() => setShowNotif(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [hasUpcomingSoon, showNotif]);

  return (
    <div className="dashboard-page-container">
      <Navbar />
      <div className="dashboard-content">
        {hasUpcomingSoon && showNotif && (
          <div className="notif-popup">
            <span role="img" aria-label="bell">🔔</span>
            Reminder: You have a booking {isTodayOrTomorrow(currentUser.bookingDate) === 0 ? 'today' : 'tomorrow'} at <b>{currentUser.bookingSlot}</b>!
            <button className="notif-close" onClick={() => setShowNotif(false)}>&times;</button>
          </div>
        )}
        <h2>Dashboard</h2>
        <div className="dashboard-stats">
          <div className="stat-card">
            <span className="stat-label">Total Bookings</span>
            <span className="stat-value">{users.filter(u => u.bookingDate && u.bookingSlot).length}</span>
          </div>
          <button className="cta-btn go-book-btn" onClick={() => navigate('/profile')}>Go Book</button>
        </div>
        <div className="upcoming-section">
          <h3>Upcoming Bookings</h3>
          {upcoming.length === 0 ? (
            <div className="placeholder-card">No upcoming bookings.</div>
          ) : (
            <ul>
              {upcoming.map((user, idx) => (
                <li key={user.email + idx} className="upcoming-card">
                  <b>{user.name}</b> ({user.email})<br/>
                  <span style={{ color: '#64748b' }}>{user.profession}</span><br/>
                  <span style={{ fontSize: '0.97em' }}>{user.description}</span><br/>
                  <span style={{ color: '#4f46e5', fontWeight: 500 }}>Slot: {user.bookingSlot}</span><br/>
                  <span style={{ color: '#16a34a', fontWeight: 600 }}>
                    {user.bookingDate}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="history-section">
          <h3>Booking History</h3>
          {isLoggedIn ? (
            history.length === 0 ? (
              <div className="placeholder-card">No past bookings.</div>
            ) : (
              <ul>
                {history.map((user, idx) => (
                  <li key={user.email + idx} className="history-card">
                    <b>{user.name}</b> ({user.email})<br/>
                    <span style={{ color: '#64748b' }}>{user.profession}</span><br/>
                    <span style={{ fontSize: '0.97em' }}>{user.description}</span><br/>
                    <span style={{ color: '#4f46e5', fontWeight: 500 }}>Slot: {user.bookingSlot}</span><br/>
                    <span style={{ color: '#dc2626', fontWeight: 600 }}>
                      {user.bookingDate}
                    </span>
                  </li>
                ))}
              </ul>
            )
          ) : (
            <div className="placeholder-card">Login to view your booking history.</div>
          )}
        </div>
        <div className="users-list">
          <h3>Registered Users</h3>
          {users.length === 0 ? (
            <div className="placeholder-card">No users registered yet.</div>
          ) : (
            <ul>
              {users.map((user, idx) => (
                <li key={user.email + idx} className="user-card">
                  <b>{user.name}</b> ({user.email})<br/>
                  <span style={{ color: '#64748b' }}>{user.profession}</span><br/>
                  <span style={{ fontSize: '0.97em' }}>{user.description}</span><br/>
                  <span style={{ color: '#4f46e5', fontWeight: 500 }}>Slots: {user.slots}</span><br/>
                  {user.bookingDate && user.bookingSlot ? (
                    <span style={{ color: '#16a34a', fontWeight: 600 }}>
                      Booked: {user.bookingDate} at {user.bookingSlot}
                    </span>
                  ) : (
                    <span style={{ color: '#dc2626', fontWeight: 500 }}>No booking yet</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
        <style>{`
.dashboard-page-container {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  box-sizing: border-box;
}
.dashboard-content {
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
  margin: 2.5rem auto 0 auto;
}
.notif-popup {
  width: 100%;
  background: linear-gradient(90deg, #e0e7ff 0%, #f1f5f9 100%);
  color: #3730a3;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(79,70,229,0.08);
  padding: 1rem 2.5rem 1rem 1.2rem;
  font-size: 1.08rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-bottom: 1.2rem;
  position: relative;
  animation: notif-fadein 0.5s;
}
@keyframes notif-fadein {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
.notif-close {
  background: none;
  border: none;
  color: #64748b;
  font-size: 1.5rem;
  font-weight: bold;
  position: absolute;
  right: 1.2rem;
  top: 0.7rem;
  cursor: pointer;
  transition: color 0.2s;
}
.notif-close:hover {
  color: #dc2626;
}
.dashboard-stats {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.5rem;
  width: 100%;
  justify-content: space-between;
}
.stat-card {
  background: #e0e7ff;
  color: #3730a3;
  border-radius: 10px;
  padding: 1rem 1.5rem;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 600;
  min-width: 120px;
}
.stat-label {
  display: block;
  font-size: 0.95rem;
  color: #64748b;
  font-weight: 500;
}
.stat-value {
  font-size: 1.5rem;
  color: #4f46e5;
  font-weight: 700;
}
.go-book-btn {
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  border-radius: 20px;
  margin-left: 0.5rem;
  background: #4f46e5;
  color: #fff;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.go-book-btn:hover {
  background: #3730a3;
}
.upcoming-section {
  width: 100%;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}
.upcoming-section h3 {
  color: #3730a3;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}
.upcoming-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.upcoming-card {
  background: #e0e7ff;
  border-radius: 8px;
  padding: 0.7rem 1rem;
  margin-bottom: 0.7rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #3730a3;
  box-shadow: 0 1px 6px rgba(79,70,229,0.04);
}
.history-section {
  width: 100%;
  margin-bottom: 1.5rem;
}
.history-section h3 {
  color: #3730a3;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}
.history-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.history-card {
  background: #f1f5f9;
  border-radius: 8px;
  padding: 0.7rem 1rem;
  margin-bottom: 0.7rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #64748b;
  box-shadow: 0 1px 6px rgba(79,70,229,0.04);
}
.users-list {
  width: 100%;
  margin-top: 1.5rem;
}
.users-list h3 {
  color: #3730a3;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}
.users-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.user-card {
  background: #f1f5f9;
  border-radius: 8px;
  padding: 0.7rem 1rem;
  margin-bottom: 0.7rem;
  font-size: 1rem;
  line-height: 1.5;
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
  .dashboard-content {
    max-width: 95vw;
    padding: 1.2rem 0.5rem;
  }
}
@media (max-width: 600px) {
  .dashboard-content {
    padding: 1rem 0.2rem;
  }
  .placeholder-card {
    padding: 0.7rem 0.3rem;
    font-size: 0.95rem;
  }
  .user-card, .upcoming-card, .history-card {
    font-size: 0.95rem;
  }
  .dashboard-stats {
    flex-direction: column;
    gap: 0.7rem;
    align-items: stretch;
  }
}
`}</style>
      </div>
    </div>
  );
};

export default Dashboard; 