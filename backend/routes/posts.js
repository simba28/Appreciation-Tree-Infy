const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Post = require('../models/Post');

// @route POST /posts
// @desc Create a Post
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('empId', 'Employee Id is required').not().isEmpty(),
    check('wish', 'wish is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, empId, wish } = req.body;

      const newPost = new Post({
        name,
        empId,
        wish,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route GET /posts
// desc Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    console.log(err, 'error thrown');
    // console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
