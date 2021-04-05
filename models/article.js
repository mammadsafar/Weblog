const mongoose = require('mongoose');
const essentialSchema = {
  type: String,
  trim: true,
};

const userSchema = new mongoose.Schema({
  title: {
    ...essentialSchema,
    required: true,
    default: 'Article'
  },
  profile: {
    ...essentialSchema,
    default: '/images/articles/images/profiles/default.jpg'
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastUpdate: {
    type: Date,
    default: Date.now
  },

})




module.exports = mongoose.model('User', userSchema);