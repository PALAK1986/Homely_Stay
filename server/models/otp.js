const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600, // 600 seconds = 10 minutes
  },
});

// Mongoose automatically creates a TTL index on `createdAt` because of `expires`

module.exports = mongoose.model('Otp', otpSchema);
