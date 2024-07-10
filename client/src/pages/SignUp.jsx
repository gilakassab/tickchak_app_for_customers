import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/SignUp.css'; // Import the CSS file

function SignUp() {
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});

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

  const validate = () => {
    const newErrors = {};
    if (!username) newErrors.username = 'Username is required';
    if (!password) newErrors.password = 'Password is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!phone) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(phone)) newErrors.phone = 'Phone number is invalid';

    return newErrors;
  };

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

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
        if(response.status === 403){
          alert("Email already exists.Try Again");
        }
      } else {
        data = await response.text(); // Handle non-JSON response
      }

      if (!response.ok) {
        throw new Error(data.message || 'Failed to sign up');
      }
      navigate('/tickchak/producerlogin', { state: { fromSignUp: true } });
    } catch (error) {
     alert('Error signing up:', error.message);
    }

    setUsername('');
    setPassword('');
    setEmail('');
    setPhone('');
  };

  return (
    <div className="container">
      <button onClick={() => { navigate('/tickchak/producerlogin'); }} className="back-button">➪</button>
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
          {errors.username && <p className="error">{errors.username}</p>}
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
          {errors.password && <p className="error">{errors.password}</p>}
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
          {errors.email && <p className="error">{errors.email}</p>}
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
          {errors.phone && <p className="error">{errors.phone}</p>}
        </label>
        <br />
        <button type="submit" className="button">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
