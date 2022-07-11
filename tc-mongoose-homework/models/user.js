const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minlength: [4, 'First name must be at least 4 characters long'],
    maxlength: [50, 'First name must be at most 50 characters long']
  },
  lastName: {
    type: String,
    required: true,
    minlength: [3, 'Last name must be at least 3 characters long'],
    maxlength: [50, 'Last name must be at most 60 characters long']
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'writer', 'guest']
  },
  numberOfArticles: {
    type: Number,
    default: 0
  },
  nickname: {
    type: String
  },
  createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', ProductSchema);
