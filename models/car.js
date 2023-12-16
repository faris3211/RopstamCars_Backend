const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  sellerId: {
    type: String,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  registrationNumber: {
    type: String,
    required: true,
  },
});

const Car = mongoose.model('Car', CarSchema);

module.exports = Car;
