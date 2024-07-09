import React, { useState } from 'react';
import { Link, Navigate,useNavigate, useLocation } from 'react-router-dom';
import '../css/LogIn.css';

function ProducerLogin() {
  const navigate=useNavigate();
  const location = useLocation();
  const fromSignUp = location.state?.fromSignUp || false;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pageOpen, setPageOpen] = useState('');
  const [userData,setUserData]=useState([]);
  const [errors, setErrors] = useState({});

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleBlur = () => {
    const lowerCaseEmail = email.toLowerCase();
    if (lowerCaseEmail && !lowerCaseEmail.includes('@')) {
      setEmail(`${lowerCaseEmail}@gmail.com`);
    } else if (lowerCaseEmail && lowerCaseEmail.endsWith('@')) {
      setEmail(`${lowerCaseEmail}gmail.com`);
    } else {
      setEmail(lowerCaseEmail);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!password) newErrors.password = 'Password is required';

    return newErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3300/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail: email, password: password }),
        credentials: "include"
      });
      if (!response.ok) {
        throw new Error('Failed to log in');
      }
      const data = await response.json();
      setUserData(data.user)
      if (data.user.roleId === 1001) {
        setPageOpen("admin");
      } else {
        setPageOpen("producer");
      }

      console.log('Login successful:', data);
    } catch (error) {
      console.error('Error logging in:', error);
    }

    setEmail('');
    setPassword('');
  };

  if (pageOpen === 'admin') {
    return <Navigate to="/tickchak/adminhome" />;
  }

  if (pageOpen === 'producer') {
    return <Navigate to={`/tickchak/producer/${userData.id}`}/>;
  }

  return (
    <div className="container">
      <button onClick={() => {navigate("/tickchak/home"); }} className="back-button">➪</button>
      <h2 className="title">Log In</h2>
      <form onSubmit={handleLogin} className="form">
        <label className="label">
          Email:
          <input
            type="text"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleBlur}
            required
            className="input"
          />
          {errors.email && <p className="error">{errors.email}</p>}
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
        <button type="submit" className="button">Log In</button>
      </form>
      {!fromSignUp && (
        <div className="footer-login">
          <p>Don't have an account? <Link to="/tickchak/signup" className="link">Sign Up</Link></p>
        </div>
      )}
      {fromSignUp && (
        <div className="footer-login">
          <p>Already have an account? <Link to="/tickchak/" className="link">Go to Home</Link></p>
        </div>
      )}
    </div>
  );
}

export default ProducerLogin;