const express = require('express');
const router = express.Router();

const postsController = require('./../controllers/posts');

// GET api/posts
router.get('/posts', postsController.getPosts);

// POST api/post
router.post('/post', postsController.storePost);

// DELETE api/post/:postid
router.delete('/post/:postid', postsController.deletePost);

// PUT api/post/:postid
router.put('/post/:postid', postsController.updatePost);

// GET api/post/:postid
router.get('/post/:postid', postsController.getPost);

module.exports = router;