// routes/blogRoutes.js
const express = require('express');
const Blog = require('../models/Blog');
const router = express.Router();

// Get all blogs
router.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single blog by ID
// Get a blog by ID
router.get('/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id); // Assuming Blog is your Mongoose model
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Create a new blog
router.post('/blogs', async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    content: req.body.content,
    // Optional: Include author name
  });

  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a blog
router.put('/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Assuming Blog is your Mongoose model
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a blog
// Delete a blog
router.delete('/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id); // Assuming Blog is your Mongoose model
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.status(204).send(); // Successfully deleted, no content to send
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
