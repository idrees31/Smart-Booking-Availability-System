import React from 'react';
import Navbar from '../components/Navbar';
import './Profile.css';

const Profile = () => {
  return (
    <div className="profile-container">
      <Navbar />
      <form className="profile-form">
        <h2>Create Your Booking Profile</h2>
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
    </div>
  );
};

export default Profile; 