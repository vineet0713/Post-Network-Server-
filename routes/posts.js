const express = require('express');
const router = express.Router();

const postsController = require('./../controllers/posts');

// GET api/posts
router.get('/posts', postsController.getPosts);

// POST api/post
router.post('/post', postsController.storePost);

module.exports = router;