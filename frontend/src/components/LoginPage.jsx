import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "./style.css";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://project-rbac-01.onrender.com/api/auth/login', { username, password });
      const { token, message, role } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      setMessage(message);

      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'moderator') {
        navigate('/moderator');
      } else if (role === 'user') {
        navigate('/user');
      }
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'An error occurred.');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p className="message">{message}</p>}
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default LoginPage;
