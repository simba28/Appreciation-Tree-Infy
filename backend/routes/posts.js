const express = require('express');
const router = express.Router();

const Post = require('../models/Post');

// @route POST /posts
// @desc Create a Post
router.post('/', async (req, res) => {
  try {
    const { username, empId, wish } = req.body;

    const newPost = new Post({
      username,
      empId,
      wish,
    });

    const post = await newPost.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET /posts
// desc Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
