const express = require('express');
const Project = require('../models/Project');
const router = express.Router();

// Get all projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new project (for testing)
router.post('/projects', async (req, res) => {
  const project = new Project({
    title: req.body.title,
    description: req.body.description,
    technologies: req.body.technologies,
    image: req.body.image, // Add this line for the image field
    features: req.body.features, // Add this line for features
    challenges: req.body.challenges, // Add this line for challenges
    futureImprovements: req.body.futureImprovements, // Add this line for future improvements
    feedback: req.body.feedback, // Add this line for feedback
    liveLink: req.body.liveLink, // Change link to liveLink
    sourceCodeLink: req.body.sourceCodeLink // Add this line for source code link
  });

  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a project by ID
router.get('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
