const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  body: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 300,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  article: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Article",
  },
});

module.exports = mongoose.model("Comment", CommentSchema);