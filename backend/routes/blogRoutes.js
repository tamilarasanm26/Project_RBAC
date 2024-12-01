const express = require('express');
const Blog = require('../models/blog');
const router = express.Router();
const { protect, authorize } = require('../middlewares/authMiddleware');

// Create a blog
router.post('/', async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  try {
    const blog = new Blog({ title, description });
    await blog.save();
    res.status(201).json({ message: 'Blog added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a blog
router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await Blog.findByIdAndDelete(id);
      res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Update a blog
  router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
  
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }
  
    try {
      await Blog.findByIdAndUpdate(id, { title, description }, { new: true });
      res.json({ message: 'Blog updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  router.get('/user-blogs', protect, async (req, res) => {
    try {
      const blogs = await Blog.find({ userId: req.user.id }); // Assuming `req.user.id` contains the authenticated user's ID
      res.json(blogs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching blogs' });
    }
  });
  


module.exports = router;
