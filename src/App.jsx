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

// Create BookingContext
// export const BookingContext = createContext();

export const UsersContext = createContext();

const App = () => {
  // Global state: registered users and booking count
  const [users, setUsers] = useState([]); // [{...profile, bookingDate, bookingSlot}]
  // const [bookingCount, setBookingCount] = useState(0);

  return (
    <AuthProvider>
      <UsersContext.Provider value={{ users, setUsers }}>
        {/* If you want to keep BookingContext, wrap Router with it here */}
        {/* <BookingContext.Provider value={{ users, setUsers, bookingCount, setBookingCount }}> */}
        <Router>
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
        </Router>
        {/* </BookingContext.Provider> */}
      </UsersContext.Provider>
    </AuthProvider>
  );
};

export default App;
