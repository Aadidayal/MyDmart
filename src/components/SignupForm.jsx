import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function SignupForm({ toggleForm }) {
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    const email = event.target.email.value;
    const password = event.target.password.value;
    const name = `${event.target.fname.value} ${event.target.lname.value}`;
    const phone = event.target.phone.value;
    const address = event.target.address.value;

    try {
      const result = await signup(name, email, password);
      if (result.success) {
        alert('Signup successful!');
        toggleForm();
      } else {
        setError(result.message || 'Signup failed');
      }
    } catch (err) {
      setError('An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <fieldset>
        <legend>Signup Form</legend>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label htmlFor="fname">First Name</label>
          <input type="text" className="form-control" id="fname" name="fname" placeholder="required" required />
        </div>
        <div className="form-group">
          <label htmlFor="lname">Last Name</label>
          <input type="text" className="form-control" id="lname" name="lname" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" id="email" name="email" placeholder="required" required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" className="form-control" id="phone" name="phone" placeholder="required" required />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input type="text" className="form-control" id="address" name="address" placeholder="required" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" name="password" placeholder="required" required />
        </div>
        <div className="form-group text-center">
          <button type="submit" className="btn btn-custom" disabled={isLoading}>
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </button>
          <button type="reset" className="btn btn-secondary">Reset</button>
        </div>
        <div className="form-group text-center">
          <button type="button" onClick={toggleForm} className="btn-link" style={{ color: '#f9c74f' }}>
            Already have an account? Login
          </button>
        </div>
      </fieldset>
    </form>
  );
}

export default SignupForm;
