const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
     title: { type: String, required: true },
     description: { type: String, required: true },
     technologies: { type: [String], required: true },
     image: { type: String, required: true }, // Field for project image URL
     features: { type: [String], required: true }, // Array of features
     challenges: { type: String, required: false }, // Challenges faced during the project
     futureImprovements: { type: String, required: false }, // Future improvements for the project
     feedback: { type: String, required: false }, // User feedback or testimonials
     liveLink: { type: String, required: true }, // Link to the live demo
     sourceCodeLink: { type: String, required: true } 
});

module.exports = mongoose.model('Project', projectSchema);
