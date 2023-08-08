const express = require('express');
const mongoose = require('mongoose');
const Feedback = require('./feedbackModel');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000; // Use a different port for the backend

app.use(express.json());
app.use(cors());

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);

require('dotenv').config(); // Load environmental variables from .env

const dbURI = process.env.DB_URI;
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

// Endpoint for submitting feedback
app.post('/api/feedback', async (req, res) => {
  try {
    const feedbackData = req.body;
    const newFeedback = new Feedback(feedbackData);
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully.' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

// Endpoint for fetching all feedback responses
app.get('/api/feedback', async (req, res) => {
  try {
    const allFeedback = await Feedback.find();
    res.status(200).json(allFeedback);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
