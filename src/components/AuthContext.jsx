import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    // Simulate login - in real app, this would be an API call
    setIsLoggedIn(true);
    setCurrentUser({ email, name: 'User' });
  };

  const signup = async (email, password, name) => {
    // Simulate signup - in real app, this would be an API call
    setIsLoggedIn(true);
    setCurrentUser({ email, name });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate('/'); // Redirect to landing page
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, currentUser, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; 