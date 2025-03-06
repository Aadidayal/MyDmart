import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "../sec.css"

function LoginForm({ toggleForm, onLoginSuccess }) {
  const navigate = useNavigate(); // Initialize the navigation hook

  const handleLogin = (event) => {
    event.preventDefault();

    const username = event.target.loginEmail.value;
    const password = event.target.loginPassword.value;

    // Get the existing users data from localStorage
    const userData = JSON.parse(localStorage.getItem('userData')) || { customers: [] };
    
    
    // Find the user from the stored data
    const existingUser = userData.customers.find((user) => user.username === username);

    // If no user found or password doesn't match
    if (!existingUser || existingUser.password !== password) {
      alert('Wrong username or password!');
      return;
    }

    // If login is successful, alert and update login state
    alert('Login successful!');
    onLoginSuccess(); // Trigger the login success handler passed as prop

    // Redirect to reservation page after successful login
    navigate('/reservation');
  };

  return (
    <form onSubmit={handleLogin}>
      <fieldset>
        <legend>Login Form</legend>
        <div className="form-group">
          <label htmlFor="loginEmail">Email</label>
          <input type="email" className="form-control" id="loginEmail" name="loginEmail" required />
        </div>
        <div className="form-group">
          <label htmlFor="loginPassword">Password</label>
          <input type="password" className="form-control" id="loginPassword" name="loginPassword" required />
        </div>
        <div className="form-group text-center">
          <button type="submit" className="btn btn-custom">Login</button>
          <button type="reset" className="btn btn-secondary">Reset</button>
        </div>
        <div className="form-group text-center">
          <button type="button" onClick={toggleForm} className="btn-link" style={{ color: '#f9c74f' }}>
            Don’t have an account? Signup
          </button>
        </div>
      </fieldset>
    </form>
  );
}

export default LoginForm;
