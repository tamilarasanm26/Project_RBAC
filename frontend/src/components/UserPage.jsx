import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './userPage.css'; // Assuming you are adding styles in a separate CSS file

const UserPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token or any authentication-related data
    localStorage.removeItem('token'); // Assuming token is stored in localStorage
    // Redirect to the login page
    navigate('/login');
  };

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('https://project-rbac-01.onrender.com/api/blogs'); // Replace with your API endpoint
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  useEffect(() => {
    fetchBlogs(); // Fetch existing blogs on component mount
  }, []);

  return (
    <div className="user-page">
      <div className="container">
        <h1 className="title">Welcome, User!</h1>
        {message && <p className="message">{message}</p>}
        <h2 className="blogs-header">Existing Blogs</h2>
        <div className="blogs-list">
          {blogs.map((blog) => (
            <div key={blog._id} className="blog-card">
              <h3 className="blog-title">{blog.title}</h3>
              <p className="blog-description">{blog.description}</p>
            </div>
          ))}
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserPage;
