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
  const { users, setUsers } = useContext(UsersContext);
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

  // Cancel booking for current user
  const handleCancelBooking = () => {
    if (currentUser) {
      setUsers(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          bookingDate: undefined,
          bookingSlot: undefined,
        };
        return updated;
      });
    }
  };

  return (
    <div className="dashboard-page-container">
      <Navbar />
      <div className="dashboard-content">
        {hasUpcomingSoon && showNotif && (
          <div className="notif-popup">
            <div className="notif-icon">🔔</div>
            <div className="notif-content">
              <span className="notif-title">Booking Reminder</span>
              <span className="notif-message">
                You have a booking {isTodayOrTomorrow(currentUser.bookingDate) === 0 ? 'today' : 'tomorrow'} at <b>{currentUser.bookingSlot}</b>!
              </span>
            </div>
            <button className="notif-close" onClick={() => setShowNotif(false)}>&times;</button>
          </div>
        )}
        
        <div className="dashboard-header">
          <div className="header-icon">📊</div>
          <h2>Dashboard</h2>
          <p className="header-subtitle">
            Manage your bookings and view your activity
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-content">
              <span className="stat-value">{users.filter(u => u.bookingDate && u.bookingSlot).length}</span>
              <span className="stat-label">Total Bookings</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏰</div>
            <div className="stat-content">
              <span className="stat-value">{upcoming.length}</span>
              <span className="stat-label">Upcoming</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <span className="stat-value">{history.length}</span>
              <span className="stat-label">Completed</span>
            </div>
          </div>
          <button className="cta-btn go-book-btn" onClick={() => navigate('/profile')}>
            <span className="btn-icon">🎯</span>
            <span>Go Book</span>
          </button>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-section">
            <div className="section-header">
              <h3>📅 Upcoming Bookings</h3>
              <p>Your scheduled appointments</p>
            </div>
            {upcoming.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📅</div>
                <h4>No Upcoming Bookings</h4>
                <p>You don't have any upcoming bookings at the moment.</p>
              </div>
            ) : (
              <div className="bookings-grid">
                {upcoming.map((user, idx) => (
                  <div key={user.email + idx} className="booking-card">
                    <div className="booking-header">
                      <div className="user-avatar">{user.name.charAt(0)}</div>
                      <div className="user-info">
                        <h4>{user.name}</h4>
                        <p className="user-email">{user.email}</p>
                      </div>
                    </div>
                    <div className="booking-details">
                      <div className="detail-item">
                        <span className="detail-label">Profession:</span>
                        <span className="detail-value">{user.profession}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Slot:</span>
                        <span className="detail-value slot-time">{user.bookingSlot}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Date:</span>
                        <span className="detail-value date-time">{user.bookingDate}</span>
                      </div>
                    </div>
                    {isLoggedIn && currentUser && user.email === currentUser.email && (
                      <button className="cancel-btn" onClick={handleCancelBooking}>
                        Cancel Booking
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="dashboard-section">
            <div className="section-header">
              <h3>📚 Booking History</h3>
              <p>Your past appointments</p>
            </div>
            {isLoggedIn ? (
              history.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📚</div>
                  <h4>No Past Bookings</h4>
                  <p>You don't have any completed bookings yet.</p>
                </div>
              ) : (
                <div className="bookings-grid">
                  {history.map((user, idx) => (
                    <div key={user.email + idx} className="booking-card history">
                      <div className="booking-header">
                        <div className="user-avatar">{user.name.charAt(0)}</div>
                        <div className="user-info">
                          <h4>{user.name}</h4>
                          <p className="user-email">{user.email}</p>
                        </div>
                      </div>
                      <div className="booking-details">
                        <div className="detail-item">
                          <span className="detail-label">Profession:</span>
                          <span className="detail-value">{user.profession}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Slot:</span>
                          <span className="detail-value slot-time">{user.bookingSlot}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Date:</span>
                          <span className="detail-value date-time">{user.bookingDate}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="empty-state">
                <div className="empty-icon">🔐</div>
                <h4>Login Required</h4>
                <p>Please login to view your booking history.</p>
              </div>
            )}
          </div>

          <div className="dashboard-section full-width">
            <div className="section-header">
              <h3>👥 Registered Users</h3>
              <p>All users in the system</p>
            </div>
            {users.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">👥</div>
                <h4>No Users Registered</h4>
                <p>No users have registered yet.</p>
              </div>
            ) : (
              <div className="users-grid">
                {users.map((user, idx) => (
                  <div key={user.email + idx} className="user-card">
                    <div className="user-header">
                      <div className="user-avatar">{user.name.charAt(0)}</div>
                      <div className="user-info">
                        <h4>{user.name}</h4>
                        <p className="user-email">{user.email}</p>
                      </div>
                    </div>
                    <div className="user-details">
                      <div className="detail-item">
                        <span className="detail-label">Profession:</span>
                        <span className="detail-value">{user.profession}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Slots:</span>
                        <span className="detail-value">{user.slots}</span>
                      </div>
                      {user.bookingDate && user.bookingSlot ? (
                        <div className="booking-status booked">
                          <span className="status-icon">✅</span>
                          <span>Booked: {user.bookingDate} at {user.bookingSlot}</span>
                        </div>
                      ) : (
                        <div className="booking-status available">
                          <span className="status-icon">⏳</span>
                          <span>No booking yet</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`
.dashboard-page-container {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}
.dashboard-page-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  pointer-events: none;
}
.dashboard-content {
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
.notif-popup {
  width: 100%;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  color: #92400e;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(245, 158, 11, 0.3);
  padding: 1.2rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  position: relative;
  animation: slideIn 0.5s ease-out;
}
@keyframes slideIn {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
.notif-icon {
  font-size: 1.5rem;
  margin-right: 1rem;
}
.notif-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.notif-title {
  font-weight: 600;
  font-size: 0.9rem;
}
.notif-message {
  font-size: 0.95rem;
}
.notif-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #92400e;
  cursor: pointer;
  padding: 0.2rem;
  border-radius: 4px;
  transition: all 0.2s ease;
}
.notif-close:hover {
  background: rgba(146, 64, 14, 0.1);
}
.dashboard-header {
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
.dashboard-header h2 {
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
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
  width: 100%;
}
.stat-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
}
.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(0,0,0,0.15);
}
.stat-icon {
  font-size: 2rem;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 12px;
  flex-shrink: 0;
}
.stat-content {
  display: flex;
  flex-direction: column;
}
.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  line-height: 1;
}
.stat-label {
  color: #6b7280;
  font-size: 0.9rem;
  font-weight: 500;
  margin-top: 0.2rem;
}
.go-book-btn {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 16px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
}
.go-book-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(16, 185, 129, 0.4);
}
.btn-icon {
  font-size: 1.2rem;
}
.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  width: 100%;
}
.dashboard-section {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  border: 1px solid rgba(255,255,255,0.2);
}
.dashboard-section.full-width {
  grid-column: 1 / -1;
}
.section-header {
  text-align: center;
  margin-bottom: 2rem;
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
.empty-state {
  text-align: center;
  padding: 3rem 2rem;
  color: #6b7280;
}
.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}
.empty-state h4 {
  color: #374151;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}
.empty-state p {
  margin: 0;
  font-size: 0.95rem;
}
.bookings-grid, .users-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}
.booking-card, .user-card {
  background: #f8fafc;
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  position: relative;
}
.booking-card:hover, .user-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}
.booking-card.history {
  opacity: 0.8;
}
.booking-header, .user-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}
.user-avatar {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.2rem;
  flex-shrink: 0;
}
.user-info h4 {
  color: #1f2937;
  margin: 0 0 0.2rem 0;
  font-size: 1.1rem;
  font-weight: 600;
}
.user-email {
  color: #6b7280;
  margin: 0;
  font-size: 0.9rem;
}
.booking-details, .user-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f1f5f9;
}
.detail-item:last-child {
  border-bottom: none;
}
.detail-label {
  color: #6b7280;
  font-size: 0.9rem;
  font-weight: 500;
}
.detail-value {
  color: #1f2937;
  font-weight: 600;
  font-size: 0.9rem;
}
.slot-time {
  color: #667eea;
}
.date-time {
  color: #059669;
}
.booking-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  margin-top: 0.5rem;
}
.booking-status.booked {
  background: #dcfce7;
  color: #166534;
}
.booking-status.available {
  background: #fef3c7;
  color: #92400e;
}
.status-icon {
  font-size: 1rem;
}
.cancel-btn {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  width: 100%;
}
.cancel-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}

@media (max-width: 900px) {
  .dashboard-content {
    max-width: 98vw;
    padding: 1.2rem 0.5rem;
  }
  .dashboard-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .dashboard-header h2 {
    font-size: 2rem;
  }
  .bookings-grid, .users-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 600px) {
  .dashboard-content {
    padding: 1rem 0.2rem;
  }
  .dashboard-header h2 {
    font-size: 1.8rem;
  }
  .header-icon {
    font-size: 2.5rem;
  }
  .stats-grid {
    grid-template-columns: 1fr;
  }
  .stat-card {
    padding: 1rem;
  }
  .stat-value {
    font-size: 1.5rem;
  }
  .booking-card, .user-card {
    padding: 1rem;
  }
}
`}</style>
    </div>
  );
};

export default Dashboard; 