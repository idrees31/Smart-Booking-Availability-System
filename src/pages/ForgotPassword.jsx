import React, { useState } from 'react';
import { useAuth } from '../components/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const ForgotPassword = () => {
  const { users, setUsers } = useAuth();
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1); // 1: enter email, 2: reset form, 3: success
  const [error, setError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const user = users.find(u => u.email === email);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email) {
      setError('Please enter your email.');
      return;
    }
    if (!user) {
      setError('No account found with this email.');
      return;
    }
    setStep(2);
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    if (!newPassword || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    // Hash password
    const encoder = new TextEncoder();
    const data = encoder.encode(newPassword);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const passwordHash = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
    setUsers(prev => prev.map(u =>
      u.email === email ? { ...u, passwordHash } : u
    ));
    setStep(3);
    setTimeout(() => navigate('/login'), 2000);
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-content">
        <h2>Forgot Password</h2>
        {step === 1 && (
          <form onSubmit={handleEmailSubmit} className="forgot-form">
            <label htmlFor="email">Enter your registered email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              autoComplete="email"
            />
            {error && <div className="form-error">{error}</div>}
            <button type="submit" className="forgot-btn">Next</button>
            <Link to="/login" className="back-link">Back to Login</Link>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleReset} className="reset-form">
            <label htmlFor="newPassword">New Password:</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="newPassword"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                className="show-password-btn"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                className="show-password-btn"
                onClick={() => setShowConfirmPassword((v) => !v)}
                tabIndex={-1}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {error && <div className="form-error">{error}</div>}
            <button type="submit" className="forgot-btn">Reset Password</button>
            <Link to="/login" className="back-link">Back to Login</Link>
          </form>
        )}
        {step === 3 && (
          <div className="success-message">
            <div className="success-icon">✅</div>
            <span>Password reset successfully! Redirecting to login...</span>
            <Link to="/login" className="back-link">Go to Login</Link>
          </div>
        )}
      </div>
      <style>{`
        .forgot-password-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .forgot-password-content {
          background: rgba(255,255,255,0.97);
          padding: 2.5rem 2rem;
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          width: 90vw;
          max-width: 400px;
          text-align: center;
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
        .forgot-form, .reset-form {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        label {
          text-align: left;
          color: #374151;
          font-weight: 600;
          font-size: 0.95rem;
        }
        input {
          padding: 1rem 1.25rem;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: white;
        }
        input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        .form-error {
          color: #dc2626;
          font-size: 0.9rem;
          font-weight: 500;
        }
        .forgot-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          margin-top: 0.5rem;
          transition: all 0.3s ease;
        }
        .forgot-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }
        .back-link {
          color: #667eea;
          font-size: 0.95rem;
          text-decoration: none;
          font-weight: 500;
          margin-top: 1rem;
          display: inline-block;
        }
        .back-link:hover {
          color: #764ba2;
          text-decoration: underline;
        }
        .success-message {
          color: #059669;
          font-size: 1.1rem;
          margin-top: 2rem;
        }
        .success-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        .password-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .show-password-btn {
          background: none;
          border: none;
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1.2rem;
          cursor: pointer;
          color: #64748b;
          padding: 0 0.2rem;
        }
        .show-password-btn:focus {
          outline: 2px solid #667eea;
        }
      `}</style>
    </div>
  );
};

export default ForgotPassword; 