import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Booking from './pages/Booking';
import Admin from './pages/Admin';
import { AuthProvider, useAuth } from './components/AuthContext';

// Create contexts
export const UsersContext = createContext();
export const BookingsContext = createContext();

// Protected Route Component
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isLoggedIn, isAdmin } = useAuth();
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

const App = () => {
  // Global state: registered users and bookings
  const [users, setUsers] = useState([]); // [{...profile, bookingDate, bookingSlot}]
  const [bookings, setBookings] = useState([]); // [{id, providerId, providerName, date, slot, status, feedback}]

  return (
    <Router>
      <AuthProvider>
        <UsersContext.Provider value={{ users, setUsers }}>
          <BookingsContext.Provider value={{ bookings, setBookings }}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/landing" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/booking" 
                element={
                  <ProtectedRoute>
                    <Booking />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <Admin />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BookingsContext.Provider>
        </UsersContext.Provider>
      </AuthProvider>
    </Router>
  );
};

export default App;
