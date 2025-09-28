const express = require('express');
const { createPost } = require('../controllers/postController');

const router = express.Router();

// POST /api/posts - Create a new post
router.post('/', createPost);

module.exports = router;
