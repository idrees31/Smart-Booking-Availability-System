import React from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  // Fake profile info for placeholder
  const hasProfile = false;

  return (
    <div className="profile-container">
      <Navbar />
      <form className="profile-form">
        <h2>Create Your Booking Profile</h2>
        <p style={{ color: '#64748b', fontSize: '0.98rem', marginBottom: '1rem' }}>
          Fill in your details to let clients book your services.
        </p>
        {!hasProfile && (
          <div className="placeholder-card" style={{ marginBottom: '1rem' }}>No profile info yet. Please complete your profile.</div>
        )}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" placeholder="Your name" required />
        </div>
        <div className="form-group">
          <label htmlFor="profession">Profession</label>
          <input type="text" id="profession" name="profession" placeholder="e.g. Doctor, Coach" required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" placeholder="Describe your services" rows="3" required></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="slots">Available Slots</label>
          <input type="text" id="slots" name="slots" placeholder="e.g. Mon-Fri 9am-5pm" required />
        </div>
        <button type="submit" className="cta-btn profile-btn">Save Profile</button>
      </form>
      <style>{`
.profile-container {
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
.profile-form {
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
.profile-form h2 {
  color: #4f46e5;
  margin-bottom: 2rem;
  font-size: 1.7rem;
  font-weight: bold;
}
.form-group {
  width: 100%;
  margin-bottom: 1.3rem;
  display: flex;
  flex-direction: column;
}
.form-group label {
  color: #374151;
  font-weight: 500;
  margin-bottom: 0.5rem;
}
.form-group input,
.form-group textarea {
  padding: 0.7rem 1rem;
  border: 1px solid #c7d2fe;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s;
  resize: none;
}
.form-group input:focus,
.form-group textarea:focus {
  border: 1.5px solid #4f46e5;
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
  .profile-form {
    max-width: 95vw;
    padding: 1.2rem 0.5rem;
  }
  .cta-btn {
    max-width: 100%;
  }
}
@media (max-width: 600px) {
  .profile-form {
    padding: 1rem 0.2rem;
  }
  .placeholder-card {
    padding: 0.7rem 0.3rem;
    font-size: 0.95rem;
  }
}
`}</style>
    </div>
  );
};

export default Profile; 