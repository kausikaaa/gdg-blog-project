import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch all posts
export const fetchAllPosts = async () => {
  try {
    const response = await api.get('/api/posts');
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

// Fetch single post by ID
export const fetchPostById = async (id) => {
  try {
    const response = await api.get(`/api/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
};

// Create a new post
export const createPost = async (postData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.post('/api/posts', postData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

// Update a post
export const updatePost = async (id, postData) => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    const response = await api.put(`/api/posts/${id}`, postData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

// Delete a post
export const deletePost = async (id) => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    const response = await api.delete(`/api/posts/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};