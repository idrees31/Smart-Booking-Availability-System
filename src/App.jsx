import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Booking from './pages/Booking';
import Admin from './pages/Admin';
import { AuthProvider } from './components/AuthContext';

// Create contexts
export const UsersContext = createContext();
export const BookingsContext = createContext();

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
              <Route path="/profile" element={<Profile />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BookingsContext.Provider>
        </UsersContext.Provider>
      </AuthProvider>
    </Router>
  );
};

export default App;
