const mongoose = require('mongoose');

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


articleSchema.pre('save', function (next) {
  const article = this;
  if (this.isNew || this.isModified('title') || this.isModified('summery') || this.isModified('text') || this.isModified('profile')) {
    article.lastUpdate =  new Date() ;
  } else {
      return next();
  };
});



module.exports = mongoose.model('Article', articleSchema);