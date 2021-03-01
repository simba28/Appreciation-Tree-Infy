const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  empId: {
    type: Number,
    // required: true,
  },
  wish: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model('post', PostSchema);
module.exports = Post;
