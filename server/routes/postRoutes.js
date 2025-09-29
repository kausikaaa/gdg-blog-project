const express = require('express');
const { createPost, getPosts, getPostById, updatePost, deletePost } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// GET /api/posts - Get all posts
router.get('/', getPosts);

// POST /api/posts - Create a new post
router.post('/', createPost);

// GET /api/posts/:id - Get single post by ID
// PUT /api/posts/:id - Update a post (Protected)
// DELETE /api/posts/:id - Delete a post (Protected)
router.route('/:id')
  .get(getPostById)
  .put(protect, updatePost)
  .delete(protect, deletePost);

module.exports = router;
