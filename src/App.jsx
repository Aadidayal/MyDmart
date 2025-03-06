import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import ReservationPage from './pages/ReservationPage';
import LandingPage from './components/LandingPage';
import Header from './components/Header';
import Menu from './components/MenuPage';
import './App.css';

function App() {
  const [showSignup, setShowSignup] = useState(true); // Toggle between signup and login form
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login   status

  // Toggle between login and signup forms
  const toggleForm = () => {
    setShowSignup(!showSignup);
  };

  // Function to handle successful login and change login status
  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Update the login status to true
  };

  return (
    <Router>
      {/* Render the header on every page */}
      <Header />
      <Routes>
        {/* Landing Page Route */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/menu" element={<Menu />} />

        {/* Login or Signup Route */}
        <Route
          path="/login"
          element={
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-6 signup-container">
                  {showSignup ? (
                    <SignupForm toggleForm={toggleForm} />
                  ) : (
                    <LoginForm toggleForm={toggleForm} onLoginSuccess={handleLoginSuccess} />
                  )}
                </div>
              </div>
            </div>
          }
        />

        {/* ReservationPage Route (only accessible if logged in) */}
        <Route
          path="/reservation"
          element={isLoggedIn ? <ReservationPage /> : <LoginForm toggleForm={toggleForm} onLoginSuccess={handleLoginSuccess} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
