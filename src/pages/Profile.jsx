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
    if (!form.slots.trim()) newErrors.slots = 'Available slots are required.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitted(false);
    } else {
      setUsers(prev => [...prev, { ...form }]);
      setSubmitted(true);
      setTimeout(() => navigate('/booking'), 1000);
    }
  };

  return (
    <div className="profile-page-container">
      <Navbar />
      <div className="profile-content">
        <h2>Create Your Booking Profile</h2>
        <p style={{ color: '#64748b', fontSize: '0.98rem', marginBottom: '1rem' }}>
          Fill in your details to let clients book your services.
        </p>
        <form className="profile-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              autoComplete="off"
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="off"
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              autoComplete="off"
              pattern="\d{10,15}"
            />
            {errors.phone && <span className="form-error">{errors.phone}</span>}
          </div>
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
              placeholder="e.g. Doctor, Coach"
            />
            {errors.profession && <span className="form-error">{errors.profession}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Describe your services"
            />
            {errors.description && <span className="form-error">{errors.description}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="slots">Available Slots</label>
            <input
              type="text"
              id="slots"
              name="slots"
              value={form.slots}
              onChange={handleChange}
              required
              autoComplete="off"
              placeholder="e.g. Mon-Fri 9am-5pm"
            />
            {errors.slots && <span className="form-error">{errors.slots}</span>}
          </div>
          <button className="cta-btn" type="submit">Save Profile</button>
          {submitted && <div className="success-msg">Profile saved! Redirecting to booking...</div>}
        </form>
        <style>{`
.profile-page-container {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  box-sizing: border-box;
}
.profile-content {
  background: #fff;
  padding: 2.5rem 2rem;
  border-radius: 18px;
  box-shadow: 0 2px 16px rgba(79,70,229,0.08);
  width: 90vw;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  justify-content: center;
  margin: 2.5rem auto 0 auto;
}
.profile-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.form-group label {
  color: #374151;
  font-weight: 500;
}
.form-group input, .form-group textarea {
  padding: 0.7rem 1rem;
  border: 1px solid #c7d2fe;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s;
  resize: none;
}
.form-group input:focus, .form-group textarea:focus {
  border: 1.5px solid #4f46e5;
}
.form-error {
  color: #dc2626;
  font-size: 0.95rem;
  margin-top: 0.2rem;
}
.success-msg {
  color: #16a34a;
  margin-top: 1rem;
  text-align: center;
  font-weight: 500;
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
  margin: 0 auto;
}
.cta-btn:hover {
  background: #3730a3;
}
@media (max-width: 900px) {
  .profile-content {
    max-width: 98vw;
    padding: 1.2rem 0.5rem;
  }
  .cta-btn {
    max-width: 100%;
  }
}
@media (max-width: 600px) {
  .profile-content {
    padding: 1rem 0.2rem;
  }
  .cta-btn {
    font-size: 0.95rem;
    padding: 0.6rem 1.1rem;
  }
}
`}</style>
      </div>
    </div>
  );
};

export default Profile; 