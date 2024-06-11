// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import '../css/Login.css'; // Import external CSS file

function Login({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://stemprotocol.codefremics.com/api/v2/users/login', {
        username: email,
        password: password
      });
      setToken(response.data.access_token, response.data);
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container"> {/* Add class for styling */}
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>} {/* Add class for styling */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="login-button">Login</button> {/* Add class for styling */}
      </form>
    </div>
  );
}

export default Login;
