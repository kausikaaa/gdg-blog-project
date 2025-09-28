const Post = require('../models/Post');

// @desc    Create a new post
// @route   POST /api/posts
// @access  Public
const createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required'
      });
    }

    // Create new post
    const newPost = await Post.create({
      title,
      content,
      author: author || 'Guest'
    });

    res.status(201).json({
      success: true,
      data: newPost,
      message: 'Post created successfully'
    });

  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating post',
      error: error.message
    });
  }
};

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ datePosted: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
      message: 'Posts retrieved successfully'
    });

  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching posts',
      error: error.message
    });
  }
};

module.exports = {
  createPost,
  getPosts
};
