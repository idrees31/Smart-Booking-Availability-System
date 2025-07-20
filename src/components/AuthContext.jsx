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

// Helper: hash a string using SHA-256 and return hex
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function getUsersFromStorage() {
  try {
    const data = localStorage.getItem('users');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [adminAccounts, setAdminAccounts] = useState([
    {
      email: 'admin@smartbooking.com',
      password: 'admin123',
      name: 'System Administrator',
      role: 'admin',
      createdAt: new Date().toISOString(),
      emailVerified: true
    }
  ]);
  const [users, setUsers] = useState(getUsersFromStorage()); // Store registered users
  const navigate = useNavigate();

  // Save users to localStorage whenever they change
  React.useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  // Simulate email verification (frontend demo)
  const verifyEmail = (email) => {
    setUsers(prev => prev.map(u =>
      u.email === email ? { ...u, emailVerified: true } : u
    ));
  };

  const login = async (email, password) => {
    // Check if it's an admin account
    const adminAccount = adminAccounts.find(admin => 
      admin.email === email && admin.password === password
    );
    
    if (adminAccount) {
      setIsLoggedIn(true);
      setCurrentUser({ 
        email: adminAccount.email, 
        name: adminAccount.name,
        role: 'admin'
      });
      return { success: true, role: 'admin' };
    }
    // Regular user login: check if user exists, password matches, and email is verified
    const hashed = await hashPassword(password);
    const user = users.find(u => u.email === email && u.passwordHash === hashed);
    if (user) {
      if (!user.emailVerified) {
        throw new Error('Please verify your email before logging in.');
      }
      setIsLoggedIn(true);
      setCurrentUser({ email: user.email, name: user.name, role: 'user' });
      return { success: true, role: 'user' };
    } else {
      throw new Error('Invalid email or password');
    }
  };

  const signup = async (email, password, name) => {
    // Check if email is already registered as admin
    const existingAdmin = adminAccounts.find(admin => admin.email === email);
    if (existingAdmin) {
      throw new Error('Email already registered as admin');
    }
    // Check if email is already registered as user
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      throw new Error('Email already registered');
    }
    // Hash password
    const passwordHash = await hashPassword(password);
    // Regular user signup
    setUsers(prev => [
      ...prev,
      {
        email,
        passwordHash,
        name,
        role: 'user',
        createdAt: new Date().toISOString(),
        emailVerified: false
      }
    ]);
    return { success: true, role: 'user' };
  };

  const createAdminAccount = async (email, password, name, adminCode) => {
    // Verify admin creation code (in real app, this would be more secure)
    if (adminCode !== 'ADMIN2024') {
      throw new Error('Invalid admin creation code');
    }
    
    // Check if email already exists
    const existingAdmin = adminAccounts.find(admin => admin.email === email);
    if (existingAdmin) {
      throw new Error('Admin account already exists with this email');
    }
    
    const newAdmin = {
      email,
      password,
      name,
      role: 'admin',
      createdAt: new Date().toISOString()
    };
    
    setAdminAccounts(prev => [...prev, newAdmin]);
    return { success: true, admin: newAdmin };
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate('/'); // Redirect to landing page
  };

  const isAdmin = () => {
    return currentUser && currentUser.role === 'admin';
  };

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      currentUser, 
      login, 
      signup, 
      logout, 
      isAdmin,
      createAdminAccount,
      adminAccounts,
      users,
      setUsers,
      verifyEmail
    }}>
      {children}
    </AuthContext.Provider>
  );
}; 