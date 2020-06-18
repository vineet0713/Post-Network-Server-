const express = require('express');
const router = express.Router();

const postsController = require('./../controllers/posts');

const checkAuth = require('./../middleware/check-auth');

// GET api/posts
router.get('/posts', postsController.getPosts);

// POST api/post
router.post('/post', checkAuth, postsController.storePost);

// DELETE api/post/:postid
router.delete('/post/:postid', checkAuth, postsController.deletePost);

// PUT api/post/:postid
router.put('/post/:postid', checkAuth, postsController.updatePost);

// GET api/post/:postid
router.get('/post/:postid', postsController.getPost);

module.exports = router;