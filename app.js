require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/User');
const Contact = require('./models/Contact');
const app = express();
const port = 8080;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected')).catch(err => console.error('MongoDB connection error:', err));

// Serve static files like CSS, JavaScript, Images from public
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define a route for serving the HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API route to fetch university data
app.get('/api/universities', (req, res) => {
  const universities = require('./data/universities.json');
  res.json(universities);
});

// Example route for geospatial data
app.get('/api/geospatial', (req, res) => {
  const geospatialData = {
    courseTitle: "Geospatial Engineering",
    description: "Geospatial Engineering combines surveying, mapping, and geospatial data analysis...",
    skills: [
      "GIS and BIM software (QGIS, Revit, AutoCAD)",
      "Satellite positioning (GPS/GNSS)",
      "3D reality capture",
      "Spatial data analysis"
    ],
    careerPaths: "Survey manager, GIS specialist, cartographer, urban planner, or geospatial analyst in government, construction, or tech firms."
  };
  res.json(geospatialData);
});

// Contact form endpoint (MongoDB)
app.post('/api/contact', async (req, res) => {
  console.log('Received contact form submission:', req.body); // Debug: log incoming data
  try {
    const { firstName, lastName, email, mobile, message } = req.body;
    const contact = new Contact({ firstName, lastName, email, mobile, message });
    await contact.save();
    console.log('Contact saved successfully:', contact); // Debug: log success
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving contact:', error); // Debug: log error
    res.status(500).json({ success: false, error: 'Failed to save contact.' });
  }
});

// User signup endpoint
app.post('/api/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }
    const user = new User({ firstName, lastName, email, password });
    await user.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to register user.' });
  }
});

// User login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    res.json({ success: true, firstName: user.firstName, lastName: user.lastName });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Login failed.' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
