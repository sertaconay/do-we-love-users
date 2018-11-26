const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  settings: {
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      default: Date.now,
    },
    opinion: String,
  },
});

module.exports = {
  User: mongoose.model('User', UserSchema),
};
