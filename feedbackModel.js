const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  serviceRating: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  foodQualityRating: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  comments: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  orderPlacement: {
    type: String,
    required: true,
  },
  problem: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
