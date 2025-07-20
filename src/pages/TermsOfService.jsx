import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService = () => (
  <div className="terms-container">
    <h2>Terms of Service</h2>
    <p>
      Welcome to Smart Booking! By using our service, you agree to the following terms and conditions. <br/>
      (This is a demo. Replace with your real terms.)
    </p>
    <ul>
      <li>You must provide accurate information when signing up.</li>
      <li>Do not use the service for illegal activities.</li>
      <li>We reserve the right to terminate accounts for abuse or fraud.</li>
      <li>Your data is handled according to our Privacy Policy.</li>
    </ul>
    <Link to="/signup" className="back-link">Back to Signup</Link>
    <style>{`
      .terms-container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: #1f2937;
        padding: 2rem;
      }
      h2 {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
      }
      ul {
        margin: 1rem 0 2rem 0;
        padding-left: 1.5rem;
        color: #374151;
      }
      .back-link {
        color: #667eea;
        font-weight: 600;
        margin-top: 2rem;
        text-decoration: underline;
      }
      .back-link:hover {
        color: #764ba2;
      }
    `}</style>
  </div>
);

export default TermsOfService; 