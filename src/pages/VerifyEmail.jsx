import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const VerifyEmail = () => {
  const query = useQuery();
  const email = query.get('email');
  const { verifyEmail, users } = useAuth();
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  const user = users.find(u => u.email === email);

  const handleVerify = () => {
    verifyEmail(email);
    setVerified(true);
    setTimeout(() => navigate('/login'), 1500);
  };

  if (!email || !user) {
    return (
      <div className="verify-email-container">
        <h2>Email Verification</h2>
        <p>Invalid or missing email address.</p>
        <Link to="/signup">Go to Signup</Link>
      </div>
    );
  }

  return (
    <div className="verify-email-container">
      <h2>Email Verification</h2>
      {!verified ? (
        <>
          <p>
            A verification email has been sent to <b>{email}</b>.<br/>
            (For demo, click the button below to verify your email.)
          </p>
          <button className="verify-btn" onClick={handleVerify}>
            Verify Email
          </button>
        </>
      ) : (
        <>
          <p>Your email has been verified! Redirecting to login...</p>
          <Link to="/login">Go to Login</Link>
        </>
      )}
      <style>{`
        .verify-email-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #1f2937;
        }
        .verify-email-container h2 {
          font-size: 2rem;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .verify-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          margin-top: 1.5rem;
          transition: all 0.3s ease;
        }
        .verify-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }
        a {
          color: #667eea;
          font-weight: 600;
          margin-top: 1.5rem;
        }
      `}</style>
    </div>
  );
};

export default VerifyEmail; 