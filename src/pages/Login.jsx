import React from 'react';
import Navbar from '../components/Navbar';

const Login = () => {
  return (
    <div className="login-container">
      <Navbar />
      <div className="login-content">
        <h2>Login No Longer Required</h2>
        <p style={{ color: '#64748b', textAlign: 'center' }}>
          Authentication is not needed for this demo. Please use the Dashboard and Booking features directly.
        </p>
      </div>
      <style>{`
.login-container {
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
.login-content {
  background: #fff;
  padding: 2.5rem 2rem;
  border-radius: 18px;
  box-shadow: 0 2px 16px rgba(79,70,229,0.08);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  justify-content: center;
}
.login-content h2 {
  color: #4f46e5;
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 1.2rem;
  text-align: center;
}
@media (max-width: 900px) {
  .login-content {
    max-width: 95vw;
    padding: 1.2rem 0.5rem;
  }
}
@media (max-width: 600px) {
  .login-content {
    padding: 1rem 0.2rem;
  }
}
`}</style>
    </div>
  );
};

export default Login; 