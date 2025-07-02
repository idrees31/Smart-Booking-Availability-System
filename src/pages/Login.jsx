import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  return (
    <div className="login-container">
      <form className="login-form">
        <h2>Login to SmartBooking</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter your password" required />
        </div>
        <button type="submit" className="cta-btn login-btn">Login</button>
        <p className="login-link">Don't have an account? <Link to="/signup">Sign up</Link></p>
      </form>
    </div>
  );
};

export default Login; 