import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './moderatorPage.css';

const ModeratorPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editBlogId, setEditBlogId] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/blogs');
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleAddOrEditBlog = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const response = await axios.put(`http://localhost:5000/api/blogs/${editBlogId}`, {
          title,
          description,
        });
        setMessage(response.data.message);
        setIsEditing(false);
        setEditBlogId(null);
      } else {
        const response = await axios.post('http://localhost:5000/api/blogs', {
          title,
          description,
        });
        setMessage(response.data.message);
      }
      setTitle('');
      setDescription('');
      fetchBlogs();
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'An error occurred.');
    }
  };

  const handleEditBlog = (blog) => {
    setIsEditing(true);
    setEditBlogId(blog._id);
    setTitle(blog.title);
    setDescription(blog.description);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="container">
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <h1 className="title">Welcome Moderator!</h1>

      <div className="content">
        {/* Form Container */}
        <div className="form-container">
          <h2 className="form-title">{isEditing ? 'Edit Blog' : 'Add Blog'}</h2>
          <form onSubmit={handleAddOrEditBlog} className="blog-form">
            <input
              type="text"
              placeholder="Blog Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="blog-input"
            />
            <textarea
              placeholder="Blog Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="blog-textarea"
            ></textarea>
            <button type="submit" className={`submit-button ${isEditing ? 'edit' : ''}`}>
              {isEditing ? 'Update Blog' : 'Add Blog'}
            </button>
          </form>
          {message && <p className="message">{message}</p>}
        </div>

        {/* Blogs Container */}
        <div className="blogs-container">
          <h2 className="blogs-header">Existing Blogs</h2>
          <div className="blogs-list">
            {blogs.map((blog) => (
              <div key={blog._id} className="blog-card">
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-description">{blog.description}</p>
                <button
                  onClick={() => handleEditBlog(blog)}
                  className="edit-button"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeratorPage;
