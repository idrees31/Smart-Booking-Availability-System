import React from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, signup logic goes here
    navigate('/dashboard');
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create Your Account</h2>
        <p style={{ color: '#64748b', fontSize: '0.98rem', marginBottom: '1rem' }}>
          Please fill in your details to sign up and access your dashboard.
        </p>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" placeholder="Enter your name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Create a password" required />
        </div>
        <button type="submit" className="cta-btn signup-btn">Sign Up</button>
        <p className="signup-link">Already have an account? <a href="/login">Login</a></p>
      </form>
      <style>{`
.signup-container {
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
.signup-form {
  background: #fff;
  padding: 2.5rem 2rem;
  border-radius: 18px;
  box-shadow: 0 2px 16px rgba(79,70,229,0.08);
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  justify-content: center;
}
.signup-form h2 {
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
.form-group input {
  padding: 0.7rem 1rem;
  border: 1px solid #c7d2fe;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s;
}
.form-group input:focus {
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
.signup-link {
  color: #64748b;
  font-size: 0.98rem;
}
.signup-link a {
  color: #4f46e5;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}
.signup-link a:hover {
  color: #3730a3;
}
@media (max-width: 900px) {
  .signup-form {
    max-width: 95vw;
    padding: 1.2rem 0.5rem;
  }
  .cta-btn {
    max-width: 100%;
  }
}
@media (max-width: 600px) {
  .signup-form {
    padding: 1rem 0.2rem;
  }
}
`}</style>
    </div>
  );
};

export default Signup; 