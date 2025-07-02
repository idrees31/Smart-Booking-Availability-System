import React from 'react';
import './Signup.css';

const Signup = () => {
  return (
    <div className="signup-container">
      <form className="signup-form">
        <h2>Create Your Account</h2>
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
    </div>
  );
};

export default Signup; 