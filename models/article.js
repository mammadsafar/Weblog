const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const essentialSchema = {
  type: String,
  trim: true,
};

const articleSchema = new mongoose.Schema({
  title: {
    ...essentialSchema,
    required: true,
  },
  summery: {
    ...essentialSchema,
    default: ''
  },
  text: {
    ...essentialSchema,
    default: ''
  },
  profile: {
    ...essentialSchema,
    default: '/images/articles/profiles/default.jpg'
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  lastUpdate: {
    type: Date,
    default: new Date(),
  },

})

articleSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Article', articleSchema);