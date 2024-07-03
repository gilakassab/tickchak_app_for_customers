import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/LogIn.css'

function ProducerLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  console.log("1");
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission
console.log(username,password)
    try {
      const response = await fetch(`http://localhost:3300/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName: username, password: password }),
        credentials: "include"
      });
      if (!response.ok) {
        throw new Error('Failed to log in');
      }
      const data = await response.json();
      console.log('Login successful:', data);
      Cookies.set('token', data, { expires: 1 });
      Cookies.set('user', JSON.stringify(user), { expires: 1 });
    } catch (error) {
      console.error('Error logging in:', error);
    }
    // const accessToken = jwt.sign({ user_id: user.user_id, role_id: user.role_id }, JWT_SECRET, { expiresIn: '1h' });
    // req.session.jwt = result.token;
    //             req.session.user = result.user;
    //             req.session.save((err) => {
    //                 if (err) {
    //                     console.error('Session save error:', err);
    //                     res.status(500).send({ message: 'Internal server error' });
    //                 } else {
    //                     console.log('Session after login:', req.session);
    //                     res.cookie('token', result.token, req.session.cookie);
    //                     res.status(200).send({ message: 'Logged in', user: result.user });
    //                 }
    //             });
    // Clear the fields after form submission (optional)
    setUsername('');
    setPassword('');
  };

  return (
    <div className="container">
    <h2 className="title">Log In</h2>
    <form onSubmit={handleLogin} className="form">
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
      <button type="submit" className="button">Log In</button>
    </form>
    <div className="footer">
      <p>Don't have an account? <Link to="/tickchak/signup" className="link">Sign Up</Link></p>
    </div>
  </div>
);
}
export default ProducerLogin;
