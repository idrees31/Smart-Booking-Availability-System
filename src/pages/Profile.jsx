import React, { useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { UsersContext } from '../App';

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
const validatePhone = (phone) => /^\d{10,15}$/.test(phone);

const Profile = () => {
  const navigate = useNavigate();
  const { users, setUsers } = useContext(UsersContext);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    profession: '',
    description: '',
    slots: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  // Generate automatic slot number
  const generateSlotNumber = () => {
    // Count existing users to determine next slot number
    const nextSlotNumber = users.length + 1;
    return `Slot ${nextSlotNumber}`;
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required.';
    if (!form.email.trim()) newErrors.email = 'Email is required.';
    else if (!validateEmail(form.email)) newErrors.email = 'Invalid email address.';
    else if (users.some(u => u.email === form.email)) newErrors.email = 'Email already registered.';
    if (!form.phone.trim()) newErrors.phone = 'Phone is required.';
    else if (!validatePhone(form.phone)) newErrors.phone = 'Phone must be 10-15 digits.';
    if (!form.profession.trim()) newErrors.profession = 'Profession is required.';
    if (!form.description.trim()) newErrors.description = 'Description is required.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitted(false);
    } else {
      // Auto-generate slot number
      const autoSlot = generateSlotNumber();
      setUsers(prev => [...prev, { ...form, slots: autoSlot }]);
      setSubmitted(true);
      setTimeout(() => navigate('/booking'), 1000);
    }
  };

  return (
    <div className="profile-page-container">
      <Navbar />
      <div className="profile-content">
        <div className="profile-header">
          <div className="header-icon">👤</div>
          <h2>Create Your Profile</h2>
          <p className="header-subtitle">
            Fill in your details to get your automatic slot number
          </p>
        </div>

        {submitted && (
          <div className="success-message">
            <div className="success-icon">✅</div>
            <span>Profile saved! Redirecting to booking...</span>
          </div>
        )}

        <form className="profile-form" onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <div className="form-section">
              <h3>📝 Personal Information</h3>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  placeholder="Enter your full name"
                />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  placeholder="Enter your email address"
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  pattern="\d{10,15}"
                  placeholder="Enter your phone number"
                />
                {errors.phone && <span className="form-error">{errors.phone}</span>}
              </div>
            </div>

            <div className="form-section">
              <h3>💼 Professional Details</h3>
              <div className="form-group">
                <label htmlFor="profession">Profession</label>
                <input
                  type="text"
                  id="profession"
                  name="profession"
                  value={form.profession}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  placeholder="e.g. Doctor, Coach, Consultant"
                />
                {errors.profession && <span className="form-error">{errors.profession}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="description">Service Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Describe your services and expertise"
                />
                {errors.description && <span className="form-error">{errors.description}</span>}
              </div>
            </div>
          </div>
          
          {/* Auto-generated slot display */}
          <div className="slot-section">
            <h3>🎯 Your Slot Assignment</h3>
            <div className="slot-info">
              <div className="auto-slot-display">
                <span className="slot-number">{generateSlotNumber()}</span>
                <p className="slot-description">
                  Your slot number will be automatically assigned when you save your profile.
                </p>
              </div>
            </div>
          </div>
          
          <button className="cta-btn" type="submit">Save Profile</button>
        </form>
      </div>
      <style>{`
.profile-page-container {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}
.profile-page-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  pointer-events: none;
}
.profile-content {
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
.profile-header {
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
.profile-header h2 {
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
.profile-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}
.form-section {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  border: 1px solid rgba(255,255,255,0.2);
}
.form-section h3 {
  color: #1f2937;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}
.form-group label {
  color: #374151;
  font-weight: 600;
  font-size: 0.95rem;
}
.form-group input, .form-group textarea {
  padding: 1rem 1.2rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
  resize: none;
  background: #f9fafb;
}
.form-group input:focus, .form-group textarea:focus {
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}
.form-group input::placeholder, .form-group textarea::placeholder {
  color: #9ca3af;
}
.form-error {
  color: #dc2626;
  font-size: 0.9rem;
  margin-top: 0.3rem;
  font-weight: 500;
}
.slot-section {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  text-align: center;
}
.slot-section h3 {
  color: #1f2937;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}
.slot-info {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.auto-slot-display {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border: 2px solid #0ea5e9;
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}
.slot-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  color: #0ea5e9;
  margin-bottom: 1rem;
}
.slot-description {
  color: #64748b;
  font-size: 1rem;
  margin: 0;
  line-height: 1.5;
}
.cta-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border: none;
  padding: 1rem 2rem;
  border-radius: 16px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}
.cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
}

@media (max-width: 900px) {
  .profile-content {
    max-width: 98vw;
    padding: 1.2rem 0.5rem;
  }
  .form-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .profile-header h2 {
    font-size: 2rem;
  }
}
@media (max-width: 600px) {
  .profile-content {
    padding: 1rem 0.2rem;
  }
  .profile-header h2 {
    font-size: 1.8rem;
  }
  .header-icon {
    font-size: 2.5rem;
  }
  .form-section {
    padding: 1.5rem;
  }
  .slot-number {
    font-size: 2rem;
  }
  .cta-btn {
    font-size: 1rem;
    padding: 0.8rem 1.5rem;
  }
}
`}</style>
    </div>
  );
};

export default Profile; 