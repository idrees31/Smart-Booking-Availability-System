import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => (
  <div className="privacy-container">
    <h2>Privacy Policy</h2>
    <p>
      Your privacy is important to us. This policy explains how we handle your data. <br/>
      (This is a demo. Replace with your real privacy policy.)
    </p>
    <ul>
      <li>We only collect information you provide during signup and booking.</li>
      <li>Your data is not shared with third parties.</li>
      <li>Passwords are securely hashed and never stored in plain text.</li>
      <li>You can request account deletion at any time.</li>
    </ul>
    <Link to="/signup" className="back-link">Back to Signup</Link>
    <style>{`
      .privacy-container {
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

export default PrivacyPolicy; 