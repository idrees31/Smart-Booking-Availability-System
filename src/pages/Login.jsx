import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
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
      const result = await login(formData.email, formData.password);
      
      if (result.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      setErrors({ general: 'Invalid email or password' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-content">
        <div className="login-header">
          <div className="header-icon">🔐</div>
          <h2>Welcome Back</h2>
          <p className="header-subtitle">
            Sign in to your account to continue
          </p>
        </div>

        {errors.general && (
          <div className="error-message">
            <div className="error-icon">⚠️</div>
            <span>{errors.general}</span>
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
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
                placeholder="Enter your password"
                required
                autoComplete="current-password"
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
            {errors.password && <span className="form-error">{errors.password}</span>}
          </div>

          <button 
            type="submit" 
            className="login-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              <>
                <span className="btn-icon">🚀</span>
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <p className="footer-text">
            Don't have an account?{' '}
            <Link to="/signup" className="footer-link">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
      <style>{`
.login-page-container {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-page-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  pointer-events: none;
}
.login-content {
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
.login-header {
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
.login-header h2 {
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
.login-form {
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
.login-btn {
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
.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}
.login-btn:disabled {
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
.login-footer {
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

@media (max-width: 768px) {
  .login-content {
    padding: 2rem 1.5rem;
    width: 95vw;
  }
  .login-header h2 {
    font-size: 2rem;
  }
  .header-icon {
    font-size: 2.5rem;
  }
}

@media (max-width: 480px) {
  .login-content {
    padding: 1.5rem 1rem;
  }
  .login-header h2 {
    font-size: 1.8rem;
  }
  .header-icon {
    font-size: 2rem;
  }
  .form-group input {
    padding: 0.875rem 1rem;
  }
  .login-btn {
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
  }
}
`}</style>
    </div>
  );
};

export default Login; 