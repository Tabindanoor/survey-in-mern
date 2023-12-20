
// const express = require('express');
// const app = express();
// const dotenv = require('dotenv');
// dotenv.config()
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const surveyRoutes = require('./routes/surveyRoutes.js');
// const cors = require('cors');

// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());
// app.use(cors({
//     origin:"http://localhost:3000"
// }))

// // MongoDB Connection
// mongoose.connect('mongodb://localhost/schoolSurvey', { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connection.once('open', () => {
//   console.log('Connected to MongoDB');
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// });

// // Routes
// app.use( surveyRoutes);

// // Start Server



const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/survey', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('MongoDB connected successfully');
});

// You can also listen for the 'disconnected' event
db.on('disconnected', () => {
  console.log('MongoDB disconnected');
});


// School Survey Schema
const schoolSurveySchema = new mongoose.Schema({
  name: String,
  role: String,
  schoolName: String,
  schoolAddress: String,
  feedback: String,
});

const SchoolSurvey = mongoose.model('SchoolSurvey', schoolSurveySchema);

// User Survey Schema
const userSurveySchema = new mongoose.Schema({
  question: String,
  options: [String],
});

const UserSurvey = mongoose.model('UserSurvey', userSurveySchema);

// Save School Survey
app.post('/api/school-surveys', async (req, res) => {
  try {
    const surveyData = req.body;
    const newSurvey = new SchoolSurvey(surveyData);
    const savedSurvey = await newSurvey.save();
    res.status(201).json(savedSurvey);
  } catch (error) {
    console.error('Error saving school survey:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get School Surveys
app.get('/api/school-surveys', async (req, res) => {
  try {
    const surveys = await SchoolSurvey.find();
    res.json(surveys);
  } catch (error) {
    console.error('Error fetching school surveys:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Save User Survey
app.post('/api/user-surveys', async (req, res) => {
  try {
    const surveyData = req.body;
    const newUserSurvey = new UserSurvey(surveyData);
    const savedUserSurvey = await newUserSurvey.save();
    res.status(201).json(savedUserSurvey);
  } catch (error) {
    console.error('Error saving user survey:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get User Surveys
app.get('/api/user-surveys', async (req, res) => {
  try {
    const surveys = await UserSurvey.find();
    res.json(surveys);
  } catch (error) {
    console.error('Error fetching user surveys:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
