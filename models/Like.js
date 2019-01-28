const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Create Schema
const LikeSchema = new Schema({
  businessID: {
    type: String
  },
  likes: [
    {
      userEmail: {
        type: String
      }
    }
  ]
});


module.exports = mongoose.model('likes', LikeSchema);