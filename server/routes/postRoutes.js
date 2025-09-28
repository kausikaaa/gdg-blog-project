const express = require('express');
const { createPost, getPosts, getPostById, updatePost, deletePost } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// GET /api/posts - Get all posts
router.get('/', getPosts);

// GET /api/posts/:id - Get single post by ID
router.get('/:id', getPostById);

// POST /api/posts - Create a new post
router.post('/', createPost);

// PUT /api/posts/:id - Update a post (Protected)
// DELETE /api/posts/:id - Delete a post (Protected)
router.route('/:id')
  .put(protect, updatePost)
  .delete(protect, deletePost);

module.exports = router;
