const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require("path");
const cors = require('cors');
require('dotenv').config();
const projectRoutes = require('./routes/projects');
const blogRoutes = require("./routes/blogRoutes");
const chatbotRoutes = require('./routes/chatbotRoutes');


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(express.json());

// const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "frontend", "build")));
// Serve the React app for any other route
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Could not connect to MongoDB:', error));

app.use('/api', projectRoutes);
app.use('/api', blogRoutes);
app.use('/api', chatbotRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
