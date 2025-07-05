import React, { useContext, useState } from 'react';
import Navbar from '../components/Navbar';
import { UsersContext } from '../App';

const Admin = () => {
  const { users, setUsers } = useContext(UsersContext);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState({ rating: 5, comment: '' });

  const handleDeleteUser = (email) => {
    setUsers(prev => prev.filter(user => user.email !== email));
  };

  const handleViewFeedback = (user) => {
    setSelectedUser(user);
    setShowFeedbackModal(true);
  };

  const handleSubmitFeedback = () => {
    if (selectedUser) {
      setUsers(prev => prev.map(user => 
        user.email === selectedUser.email 
          ? { ...user, feedback: feedback }
          : user
      ));
      setShowFeedbackModal(false);
      setFeedback({ rating: 5, comment: '' });
      setSelectedUser(null);
    }
  };

  const totalBookings = users.filter(u => u.bookingDate && u.bookingSlot).length;
  const totalUsers = users.length;
  const completedBookings = users.filter(u => {
    if (!u.bookingDate) return false;
    const bookingDate = new Date(u.bookingDate);
    const today = new Date();
    return bookingDate < today;
  }).length;

  return (
    <div className="admin-page-container">
      <Navbar />
      <div className="admin-content">
        <div className="admin-header">
          <div className="header-icon">👑</div>
          <h2>Admin Dashboard</h2>
          <p className="header-subtitle">
            Manage users and monitor system activity
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <span className="stat-value">{totalUsers}</span>
              <span className="stat-label">Total Users</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-content">
              <span className="stat-value">{totalBookings}</span>
              <span className="stat-label">Total Bookings</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <span className="stat-value">{completedBookings}</span>
              <span className="stat-label">Completed</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-content">
              <span className="stat-value">
                {users.filter(u => u.feedback).length}
              </span>
              <span className="stat-label">Reviews</span>
            </div>
          </div>
        </div>

        <div className="admin-section">
          <div className="section-header">
            <h3>👥 User Management</h3>
            <p>View and manage all registered users</p>
          </div>
          
          {users.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">👥</div>
              <h4>No Users Found</h4>
              <p>No users have registered yet.</p>
            </div>
          ) : (
            <div className="users-table">
              <div className="table-header">
                <div className="header-cell">User</div>
                <div className="header-cell">Contact</div>
                <div className="header-cell">Profession</div>
                <div className="header-cell">Slot</div>
                <div className="header-cell">Booking</div>
                <div className="header-cell">Actions</div>
              </div>
              
              {users.map((user, index) => (
                <div key={user.email} className="table-row">
                  <div className="user-cell">
                    <div className="user-avatar">{user.name.charAt(0)}</div>
                    <div className="user-info">
                      <h4>{user.name}</h4>
                      <p className="user-description">{user.description}</p>
                    </div>
                  </div>
                  <div className="contact-cell">
                    <div className="contact-info">
                      <div className="contact-item">
                        <span className="contact-label">📧</span>
                        <span className="contact-value">{user.email}</span>
                      </div>
                      <div className="contact-item">
                        <span className="contact-label">📞</span>
                        <span className="contact-value">{user.phone}</span>
                      </div>
                    </div>
                  </div>
                  <div className="cell">{user.profession}</div>
                  <div className="cell">{user.slots}</div>
                  <div className="cell">
                    {user.bookingDate && user.bookingSlot ? (
                      <div className="booking-info">
                        <span className="booking-date">{user.bookingDate}</span>
                        <span className="booking-slot">{user.bookingSlot}</span>
                      </div>
                    ) : (
                      <span className="no-booking">No booking</span>
                    )}
                  </div>
                  <div className="actions-cell">
                    <button 
                      className="action-btn view-btn"
                      onClick={() => handleViewFeedback(user)}
                    >
                      📝
                    </button>
                    <button 
                      className="action-btn delete-btn"
                      onClick={() => handleDeleteUser(user.email)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {showFeedbackModal && selectedUser && (
          <div className="modal-overlay" onClick={() => setShowFeedbackModal(false)}>
            <div className="feedback-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Add Feedback for {selectedUser.name}</h3>
                <button 
                  className="close-btn"
                  onClick={() => setShowFeedbackModal(false)}
                >
                  ×
                </button>
              </div>
              
              <div className="modal-content">
                <div className="rating-section">
                  <label>Rating:</label>
                  <div className="rating-stars">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        className={`star-btn ${feedback.rating >= star ? 'active' : ''}`}
                        onClick={() => setFeedback({ ...feedback, rating: star })}
                      >
                        ⭐
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="comment-section">
                  <label>Comment:</label>
                  <textarea
                    value={feedback.comment}
                    onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })}
                    placeholder="Share your experience..."
                    rows={4}
                  />
                </div>
              </div>
              
              <div className="modal-footer">
                <button 
                  className="cancel-btn"
                  onClick={() => setShowFeedbackModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="submit-btn"
                  onClick={handleSubmitFeedback}
                >
                  Submit Feedback
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <style>{`
.admin-page-container {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}
.admin-page-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  pointer-events: none;
}
.admin-content {
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
.admin-header {
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
.admin-header h2 {
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
.admin-section {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  width: 100%;
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
.users-table {
  background: #f8fafc;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}
.table-header {
  display: grid;
  grid-template-columns: 2fr 1.5fr 1fr 1fr 1.5fr 1fr;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
}
.header-cell {
  display: flex;
  align-items: center;
}
.table-row {
  display: grid;
  grid-template-columns: 2fr 1.5fr 1fr 1fr 1.5fr 1fr;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}
.table-row:hover {
  background: #f1f5f9;
}
.table-row:last-child {
  border-bottom: none;
}
.user-cell {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}
.user-avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1rem;
  flex-shrink: 0;
}
.user-info h4 {
  color: #1f2937;
  margin: 0 0 0.2rem 0;
  font-size: 1rem;
  font-weight: 600;
}
.user-description {
  color: #6b7280;
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.contact-cell {
  display: flex;
  align-items: center;
}
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  width: 100%;
}
.contact-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.85rem;
}
.contact-label {
  font-size: 0.8rem;
  opacity: 0.8;
}
.contact-value {
  color: #374151;
  font-weight: 500;
  word-break: break-all;
}
.cell {
  display: flex;
  align-items: center;
  color: #374151;
  font-size: 0.9rem;
}
.booking-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.booking-date {
  color: #059669;
  font-weight: 600;
  font-size: 0.85rem;
}
.booking-slot {
  color: #667eea;
  font-size: 0.8rem;
}
.no-booking {
  color: #9ca3af;
  font-style: italic;
  font-size: 0.85rem;
}
.actions-cell {
  display: flex;
  gap: 0.5rem;
}
.action-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.3rem;
  border-radius: 6px;
  transition: all 0.3s ease;
}
.view-btn:hover {
  background: #dbeafe;
  transform: scale(1.1);
}
.delete-btn:hover {
  background: #fee2e2;
  transform: scale(1.1);
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.feedback-modal {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  width: 90vw;
  max-width: 500px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
  animation: slideUp 0.3s ease-out;
}
@keyframes slideUp {
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}
.modal-header h3 {
  color: #1f2937;
  margin: 0;
  font-size: 1.3rem;
}
.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
  padding: 0.2rem;
  border-radius: 4px;
  transition: all 0.2s ease;
}
.close-btn:hover {
  background: #f3f4f6;
  color: #374151;
}
.modal-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}
.rating-section, .comment-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.rating-section label, .comment-section label {
  color: #374151;
  font-weight: 600;
  font-size: 0.95rem;
}
.rating-stars {
  display: flex;
  gap: 0.5rem;
}
.star-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0.3;
}
.star-btn.active {
  opacity: 1;
  transform: scale(1.1);
}
.star-btn:hover {
  transform: scale(1.2);
}
.comment-section textarea {
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
  resize: vertical;
  font-family: inherit;
}
.comment-section textarea:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}
.modal-footer {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}
.cancel-btn, .submit-btn {
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}
.cancel-btn {
  background: #f3f4f6;
  color: #374151;
}
.cancel-btn:hover {
  background: #e5e7eb;
}
.submit-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}
.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

@media (max-width: 900px) {
  .admin-content {
    max-width: 98vw;
    padding: 1.2rem 0.5rem;
  }
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .admin-header h2 {
    font-size: 2rem;
  }
  .table-header, .table-row {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  .header-cell, .cell {
    padding: 0.5rem 0;
  }
  .user-cell {
    justify-content: center;
  }
  .contact-cell {
    justify-content: center;
  }
  .actions-cell {
    justify-content: center;
  }
  .contact-info {
    align-items: center;
  }
  .contact-item {
    justify-content: center;
  }
}
@media (max-width: 600px) {
  .admin-content {
    padding: 1rem 0.2rem;
  }
  .admin-header h2 {
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
  .feedback-modal {
    margin: 1rem;
    padding: 1.5rem;
  }
}
`}</style>
    </div>
  );
};

export default Admin; 