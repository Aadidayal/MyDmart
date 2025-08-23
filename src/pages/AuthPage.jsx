// src/pages/AuthPage.jsx

import React, { useState } from 'react';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';

function AuthPage() {
  const [showSignup, setShowSignup] = useState(true);

  const toggleForm = () => {
    setShowSignup(!showSignup);
  };

  return (
    <div className="container">
      <h1>{showSignup ? 'Sign Up' : 'Login'}</h1>
      <div className="row justify-content-center">
        <div className="col-md-6 signup-container">
          {showSignup ? (
            <SignupForm toggleForm={toggleForm} />
          ) : (
            <LoginForm toggleForm={toggleForm} />
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
