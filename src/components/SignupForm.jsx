import React from 'react';

function SignupForm({ toggleForm }) {
  const handleSignup = (event) => {
    event.preventDefault();

    const username = event.target.email.value;
    const password = event.target.password.value;
    const firstName = event.target.fname.value;
    const lastName = event.target.lname.value;
    const phone = event.target.phone.value;
    const address = event.target.address.value;

    const userData = JSON.parse(localStorage.getItem('userData')) || { customers: [] };
    const existingUser = userData.customers.find((user) => user.username === username);

    if (existingUser) {
      alert('Username already exists!');
      return;
    }

    const newUser = { username, password, firstName, lastName, phone, address };
    userData.customers.push(newUser);
    localStorage.setItem('userData', JSON.stringify(userData));

    alert('Signup successful!');
    toggleForm();
  };

  return (
    <form onSubmit={handleSignup}>
      <fieldset>
        <legend>Signup Form</legend>
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
          <button type="submit" className="btn btn-custom">Sign Up</button>
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
