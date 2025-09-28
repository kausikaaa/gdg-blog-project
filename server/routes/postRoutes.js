const express = require('express');
const { createPost, getPosts, getPostById } = require('../controllers/postController');

const router = express.Router();

// GET /api/posts - Get all posts
router.get('/', getPosts);

// GET /api/posts/:id - Get single post by ID
router.get('/:id', getPostById);

// POST /api/posts - Create a new post
router.post('/', createPost);

module.exports = router;
