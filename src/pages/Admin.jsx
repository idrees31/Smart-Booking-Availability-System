import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { UsersContext } from '../App';
import { useAuth } from '../components/AuthContext';

const Admin = () => {
  const { users, setUsers } = useContext(UsersContext);
  const { isAdmin, isLoggedIn, createAdminAccount } = useAuth();
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showCreateAdminModal, setShowCreateAdminModal] = useState(false);
  const [feedback, setFeedback] = useState({ rating: 5, comment: '' });
  const [newAdminData, setNewAdminData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    adminCode: ''
  });
  const [adminErrors, setAdminErrors] = useState({});
  const [showAccessDenied, setShowAccessDenied] = useState(false);

  // Check admin access
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    
    if (!isAdmin()) {
      setShowAccessDenied(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    }
  }, [isLoggedIn, isAdmin, navigate]);

  // If not admin, show access denied
  if (!isLoggedIn || !isAdmin()) {
    return (
      <div className="access-denied-container">
        <div className="access-denied-content">
          <div className="access-denied-icon">🚫</div>
          <h2>Access Denied</h2>
          <p>You don't have permission to access the admin panel.</p>
          <p>Redirecting to dashboard...</p>
        </div>
        <style>{`
          .access-denied-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
          }
          .access-denied-content {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            padding: 3rem 2rem;
            border-radius: 24px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            animation: slideUp 0.6s ease-out;
          }
          .access-denied-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
            animation: shake 0.5s ease-in-out;
          }
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
          }
          .access-denied-content h2 {
            color: #dc2626;
            margin-bottom: 1rem;
            font-size: 2rem;
          }
          .access-denied-content p {
            color: #64748b;
            margin-bottom: 0.5rem;
            font-size: 1.1rem;
          }
        `}</style>
      </div>
    );
  }

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

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    const errors = {};
    
    if (!newAdminData.name) errors.name = 'Name is required';
    if (!newAdminData.email) errors.email = 'Email is required';
    if (!newAdminData.password) errors.password = 'Password is required';
    if (newAdminData.password !== newAdminData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    if (newAdminData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (!newAdminData.adminCode) {
      errors.adminCode = 'Admin code is required';
    }
    
    if (Object.keys(errors).length > 0) {
      setAdminErrors(errors);
      return;
    }

    try {
      await createAdminAccount(
        newAdminData.email, 
        newAdminData.password, 
        newAdminData.name, 
        newAdminData.adminCode
      );
      setShowCreateAdminModal(false);
      setNewAdminData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        adminCode: ''
      });
      setAdminErrors({});
      alert('Admin account created successfully!');
    } catch (error) {
      setAdminErrors({ general: error.message });
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
          <div className="header-icon">🛡️</div>
          <h2>Admin Dashboard</h2>
          <p className="header-subtitle">
            Manage users and monitor system activity
          </p>
          <div className="admin-badge">
            <span className="badge-icon">🛡️</span>
            <span>Administrator Access</span>
          </div>
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

        <div className="admin-actions">
          <button 
            className="create-admin-btn"
            onClick={() => setShowCreateAdminModal(true)}
          >
            <span className="btn-icon">👑</span>
            <span>Create New Admin</span>
          </button>
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
                      title="Add Feedback"
                    >
                      📝
                    </button>
                    <button 
                      className="action-btn delete-btn"
                      onClick={() => handleDeleteUser(user.email)}
                      title="Delete User"
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
                
                <div className="modal-actions">
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
          </div>
        )}

        {showCreateAdminModal && (
          <div className="modal-overlay" onClick={() => setShowCreateAdminModal(false)}>
            <div className="create-admin-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Create New Admin Account</h3>
                <button 
                  className="close-btn"
                  onClick={() => setShowCreateAdminModal(false)}
                >
                  ×
                </button>
              </div>
              
              <form className="modal-content" onSubmit={handleCreateAdmin}>
                {adminErrors.general && (
                  <div className="error-message">
                    <div className="error-icon">⚠️</div>
                    <span>{adminErrors.general}</span>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="adminName">Full Name</label>
                  <input
                    type="text"
                    id="adminName"
                    value={newAdminData.name}
                    onChange={(e) => setNewAdminData({...newAdminData, name: e.target.value})}
                    placeholder="Enter admin's full name"
                    required
                  />
                  {adminErrors.name && <span className="form-error">{adminErrors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="adminEmail">Email Address</label>
                  <input
                    type="email"
                    id="adminEmail"
                    value={newAdminData.email}
                    onChange={(e) => setNewAdminData({...newAdminData, email: e.target.value})}
                    placeholder="Enter admin's email"
                    required
                  />
                  {adminErrors.email && <span className="form-error">{adminErrors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="adminPassword">Password</label>
                  <input
                    type="password"
                    id="adminPassword"
                    value={newAdminData.password}
                    onChange={(e) => setNewAdminData({...newAdminData, password: e.target.value})}
                    placeholder="Create a password"
                    required
                  />
                  {adminErrors.password && <span className="form-error">{adminErrors.password}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="adminConfirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="adminConfirmPassword"
                    value={newAdminData.confirmPassword}
                    onChange={(e) => setNewAdminData({...newAdminData, confirmPassword: e.target.value})}
                    placeholder="Confirm password"
                    required
                  />
                  {adminErrors.confirmPassword && <span className="form-error">{adminErrors.confirmPassword}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="adminCode">Admin Creation Code</label>
                  <input
                    type="password"
                    id="adminCode"
                    value={newAdminData.adminCode}
                    onChange={(e) => setNewAdminData({...newAdminData, adminCode: e.target.value})}
                    placeholder="Enter admin creation code"
                    required
                  />
                  {adminErrors.adminCode && <span className="form-error">{adminErrors.adminCode}</span>}
                  <div className="admin-code-hint">
                    <span className="hint-icon">💡</span>
                    <span>Use code: <strong>ADMIN2024</strong></span>
                  </div>
                </div>

                <div className="modal-actions">
                  <button 
                    type="button"
                    className="cancel-btn"
                    onClick={() => setShowCreateAdminModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="submit-btn"
                  >
                    Create Admin Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <style>{`
.admin-page-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow-x: hidden;
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
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 2rem 2rem;
  position: relative;
  z-index: 1;
}

.admin-header {
  text-align: center;
  margin-bottom: 3rem;
  animation: slideUp 0.6s ease-out;
}

.header-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

.admin-header h2 {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.header-subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.admin-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
}

.badge-icon {
  font-size: 1.1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  animation: slideUp 0.6s ease-out;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  font-size: 2.5rem;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  line-height: 1;
}

.stat-label {
  color: #6b7280;
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.admin-actions {
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
}

.create-admin-btn {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
}

.create-admin-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(245, 158, 11, 0.4);
}

.btn-icon {
  font-size: 1.2rem;
}

.admin-section {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: slideUp 0.8s ease-out;
}

.section-header {
  margin-bottom: 2rem;
  text-align: center;
}

.section-header h3 {
  font-size: 1.8rem;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.section-header p {
  color: #6b7280;
  font-size: 1rem;
}

.empty-state {
  text-align: center;
  padding: 3rem 2rem;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state h4 {
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.empty-state p {
  color: #6b7280;
}

.users-table {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr 1.5fr 1fr;
  gap: 1rem;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
  padding: 1rem 1.5rem;
  font-weight: 600;
}

.header-cell {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr 1.5fr 1fr;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.table-row:hover {
  background: #f9fafb;
}

.table-row:last-child {
  border-bottom: none;
}

.user-cell {
  display: flex;
  align-items: center;
  gap: 1rem;
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
  font-size: 1.1rem;
}

.user-info h4 {
  color: #1f2937;
  margin-bottom: 0.25rem;
  font-size: 1rem;
}

.user-description {
  color: #6b7280;
  font-size: 0.85rem;
  margin: 0;
}

.contact-cell {
  display: flex;
  align-items: center;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.contact-label {
  font-size: 0.8rem;
}

.contact-value {
  color: #374151;
  font-weight: 500;
}

.cell {
  display: flex;
  align-items: center;
  color: #374151;
  font-weight: 500;
}

.booking-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.booking-date {
  font-size: 0.85rem;
  color: #059669;
  font-weight: 600;
}

.booking-slot {
  font-size: 0.8rem;
  color: #6b7280;
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
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.view-btn {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}

.view-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.delete-btn {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
}

.delete-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.feedback-modal, .create-admin-modal {
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  width: 90vw;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  animation: slideUp 0.3s ease-out;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h3 {
  color: #1f2937;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: #f3f4f6;
  color: #374151;
}

.modal-content {
  padding: 2rem;
}

.rating-section {
  margin-bottom: 1.5rem;
}

.rating-section label {
  display: block;
  margin-bottom: 0.5rem;
  color: #374151;
  font-weight: 600;
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

.comment-section {
  margin-bottom: 2rem;
}

.comment-section label {
  display: block;
  margin-bottom: 0.5rem;
  color: #374151;
  font-weight: 600;
}

.comment-section textarea {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-family: inherit;
  font-size: 1rem;
  resize: vertical;
  transition: all 0.3s ease;
}

.comment-section textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.cancel-btn, .submit-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
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
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #374151;
  font-weight: 600;
}

.form-group input {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-error {
  color: #dc2626;
  font-size: 0.85rem;
  font-weight: 500;
  margin-top: 0.25rem;
}

.admin-code-hint {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  padding: 0.75rem;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border: 1px solid #bae6fd;
  border-radius: 8px;
  font-size: 0.85rem;
  color: #0369a1;
}

.hint-icon {
  font-size: 1rem;
}

.error-message {
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  color: #dc2626;
  border: 1px solid #fecaca;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.error-icon {
  font-size: 1.2rem;
}

@keyframes slideUp {
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@media (max-width: 1024px) {
  .admin-content {
    padding: 100px 1.5rem 2rem;
  }
  
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
  
  .table-header, .table-row {
    grid-template-columns: 1.5fr 1.5fr 1fr 1fr 1fr 1fr;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
  }
}

@media (max-width: 768px) {
  .admin-header h2 {
    font-size: 2.5rem;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .stat-card {
    padding: 1.5rem;
  }
  
  .stat-value {
    font-size: 2rem;
  }
  
  .table-header, .table-row {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .header-cell {
    display: none;
  }
  
  .table-row {
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    margin-bottom: 1rem;
    padding: 1rem;
  }
  
  .user-cell, .contact-cell, .cell, .actions-cell {
    justify-content: center;
    text-align: center;
  }
  
  .contact-info {
    align-items: center;
  }
  
  .actions-cell {
    justify-content: center;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .admin-content {
    padding: 100px 1rem 2rem;
  }
  
  .admin-header h2 {
    font-size: 2rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .admin-section {
    padding: 1.5rem;
  }
  
  .modal-content {
    padding: 1.5rem;
  }
  
  .modal-actions {
    flex-direction: column;
  }
}
`}</style>
    </div>
  );
};

export default Admin; 