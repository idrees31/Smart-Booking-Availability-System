import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrors({ ...errors, [e.target.name]: '' });
    if (e.target.name === 'password') {
      setPasswordStrength(getPasswordStrength(e.target.value));
    }
  };

  function getPasswordStrength(password) {
    if (!password) return '';
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (score <= 1) return 'Weak';
    if (score === 2 || score === 3) return 'Medium';
    return 'Strong';
  }

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!agreed) {
      newErrors.agreed = 'You must agree to the Terms of Service and Privacy Policy';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    try {
      await signup(formData.email, formData.password, formData.name);
      navigate(`/verify-email?email=${encodeURIComponent(formData.email)}`);
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page-container">
      <div className="signup-content">
        <div className="signup-header">
          <div className="header-icon">🌟</div>
          <h2>Join Smart Booking</h2>
          <p className="header-subtitle">
            Create your account to start booking
          </p>
        </div>

        {errors.general && (
          <div className="error-message">
            <div className="error-icon">⚠️</div>
            <span>{errors.general}</span>
          </div>
        )}

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              autoComplete="name"
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              autoComplete="email"
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
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
            {passwordStrength && (
              <div className={`password-strength ${passwordStrength.toLowerCase()}`}>{passwordStrength} password</div>
            )}
            {errors.password && <span className="form-error">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
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
            {errors.confirmPassword && <span className="form-error">{errors.confirmPassword}</span>}
          </div>

          <button 
            type="submit" 
            className="signup-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
                <span>Creating Account...</span>
              </div>
            ) : (
              <>
                <span className="btn-icon">🚀</span>
                <span>Create Account</span>
              </>
            )}
          </button>
         <div className="terms-checkbox">
           <label>
             <input
               type="checkbox"
               checked={agreed}
               onChange={e => setAgreed(e.target.checked)}
               required
             />
             I agree to the <a href="#" target="_blank" rel="noopener noreferrer">Terms of Service</a> and <a href="#" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
           </label>
           {errors.agreed && <span className="form-error">{errors.agreed}</span>}
         </div>
        </form>

        <div className="signup-footer">
          <p className="footer-text">
            Already have an account?{' '}
            <Link to="/login" className="footer-link">
              Login here
            </Link>
          </p>
        </div>
      </div>
      <style>{`
.signup-page-container {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.signup-page-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  pointer-events: none;
}
.signup-content {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 3rem 2.5rem;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  width: 90vw;
  max-width: 500px;
  position: relative;
  z-index: 1;
  animation: slideUp 0.6s ease-out;
}
@keyframes slideUp {
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
.signup-header {
  text-align: center;
  margin-bottom: 2rem;
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
.signup-header h2 {
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
.error-message {
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  color: #dc2626;
  border: 1px solid #fecaca;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  margin-bottom: 2rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.error-icon {
  font-size: 1.2rem;
}
.signup-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.form-group label {
  color: #374151;
  font-weight: 600;
  font-size: 0.95rem;
}
.form-group input {
  padding: 1rem 1.25rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
}
.form-group input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}
.form-error {
  color: #dc2626;
  font-size: 0.85rem;
  font-weight: 500;
}
.signup-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}
.signup-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}
.signup-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.btn-icon {
  font-size: 1.2rem;
}
.loading-spinner {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.signup-footer {
  text-align: center;
  margin-top: 2rem;
}
.footer-text {
  color: #64748b;
  font-size: 1rem;
}
.footer-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}
.footer-link:hover {
  color: #5a67d8;
}
.password-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}
.password-input-wrapper input[type="password"],
.password-input-wrapper input[type="text"] {
  width: 100%;
  padding-right: 2.5rem;
  box-sizing: border-box;
}
.show-password-btn {
  background: none;
  border: none;
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  cursor: pointer;
  color: #64748b;
  padding: 0 0.2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.show-password-btn:focus {
  outline: 2px solid #667eea;
}
.password-strength {
  margin-top: 0.3rem;
  font-size: 0.95rem;
  font-weight: 600;
}
.password-strength.weak { color: #dc2626; }
.password-strength.medium { color: #f59e42; }
.password-strength.strong { color: #059669; }

.terms-checkbox {
  margin-top: 1.2rem;
  font-size: 0.97rem;
  color: #374151;
}
.terms-checkbox label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.terms-checkbox input[type="checkbox"] {
  margin-right: 0.5rem;
  accent-color: #667eea;
}
.terms-checkbox a {
  color: #667eea;
  text-decoration: underline;
  font-weight: 500;
}
.terms-checkbox a:hover {
  color: #764ba2;
}

@media (max-width: 768px) {
  .signup-content {
    padding: 2rem 1.5rem;
    width: 95vw;
  }
  .signup-header h2 {
    font-size: 2rem;
  }
  .header-icon {
    font-size: 2.5rem;
  }
}

@media (max-width: 480px) {
  .signup-content {
    padding: 1.5rem 1rem;
  }
  .signup-header h2 {
    font-size: 1.8rem;
  }
  .header-icon {
    font-size: 2rem;
  }
  .form-group input {
    padding: 0.875rem 1rem;
  }
  .signup-btn {
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
  }
}
`}</style>
    </div>
  );
};

export default Signup; 