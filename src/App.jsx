import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Booking from './pages/Booking';
import Admin from './pages/Admin';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import { AuthProvider, useAuth } from './components/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';

// Create contexts
export const UsersContext = createContext();
export const BookingsContext = createContext();

// Minimal fade-only animation
const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
const pageTransition = { duration: 0.35, ease: 'easeInOut' };

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

// Animated Routes Wrapper
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <Landing />
          </motion.div>
        } />
        <Route path="/landing" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <Landing />
          </motion.div>
        } />
        <Route path="/login" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <Login />
          </motion.div>
        } />
        <Route path="/signup" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <Signup />
          </motion.div>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
              <Profile />
            </motion.div>
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
              <Dashboard />
            </motion.div>
          </ProtectedRoute>
        } />
        <Route path="/booking" element={
          <ProtectedRoute>
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
              <Booking />
            </motion.div>
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute requireAdmin={true}>
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
              <Admin />
            </motion.div>
          </ProtectedRoute>
        } />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => {
  // Global state: registered users and bookings
  const [users, setUsers] = useState([]); // [{...profile, bookingDate, bookingSlot}]
  const [bookings, setBookings] = useState([]); // [{id, providerId, providerName, date, slot, status, feedback}]

  return (
    <Router>
      <AuthProvider>
        <UsersContext.Provider value={{ users, setUsers }}>
          <BookingsContext.Provider value={{ bookings, setBookings }}>
            <AnimatedRoutes />
          </BookingsContext.Provider>
        </UsersContext.Provider>
      </AuthProvider>
    </Router>
  );
};

export default App;
