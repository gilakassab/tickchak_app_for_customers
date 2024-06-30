import React, { useState } from 'react';
import '../css/SignUp.css'; // Import the CSS file

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const response = await fetch('http://localhost:3300/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          userName: username,
          password: password,
          userEmail: email,
          userPhone: phone,
        }),
      });

      const contentType = response.headers.get('content-type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text(); // Handle non-JSON response
      }

      if (!response.ok) {
        throw new Error(data.message || 'Failed to sign up');
      }
      alert("sign up successful");
      console.log('Sign up successful:', data);
    } catch (error) {
      console.error('Error signing up:', error.message);
    }

    // Clear the fields after form submission (optional)
    setUsername('');
    setPassword('');
    setEmail('');
    setPhone('');
  };

  return (
    <div className="container">
      <h2 className="title">Sign Up</h2>
      <form onSubmit={handleSignUp} className="form">
        <label className="label">
          Username:
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            required
            className="input"
          />
        </label>
        <br />
        <label className="label">
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="input"
          />
        </label>
        <br />
        <label className="label">
          Email:
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
            className="input"
          />
        </label>
        <br />
        <label className="label">
          Phone:
          <input
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            required
            className="input"
          />
        </label>
        <br />
        <button type="submit" className="button">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;

