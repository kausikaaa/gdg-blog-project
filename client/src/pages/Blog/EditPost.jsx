import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchPostById, updatePost } from '../../api/posts';
import { useAuth } from '../../context/AuthContext';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchPostById(id);
        setPost(response.data);
        setFormData({
          title: response.data.title,
          content: response.data.content
        });
      } catch (err) {
        console.error('Error loading post:', err);
        setError('Failed to load post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadPost();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Title and content are required');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      
      await updatePost(id, formData);
      
      // Redirect to single post page on success
      navigate(`/posts/${id}`);
    } catch (err) {
      console.error('Error updating post:', err);
      const errorMessage = err.response?.data?.message || 'Failed to update post. Please try again.';
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  // Error message component
  const ErrorMessage = ({ message }) => (
    <div className="flex justify-center items-center py-12">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
        <div className="text-red-600 mb-2">
          <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-red-800 mb-2">Error</h3>
        <p className="text-red-600 mb-4">{message}</p>
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors duration-200"
        >
          <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  );

  // Not authorized component
  const NotAuthorized = () => (
    <div className="flex justify-center items-center py-12">
      <div className="text-center">
        <svg className="mx-auto h-12 w-12 text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Not Authorized</h3>
        <p className="text-gray-500 mb-4">You can only edit posts that you created.</p>
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  );

  // Check authentication
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please log in</h1>
          <p className="text-gray-600 mb-4">You need to be logged in to edit posts.</p>
          <Link
            to="/login"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!post) return <ErrorMessage message="Post not found" />;
  
  // Check if user is the author
  if (user && post.author !== user.name) {
    return <NotAuthorized />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link
              to={`/posts/${id}`}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 mr-4"
            >
              <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Post
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Post</h1>
          <p className="text-gray-600 mt-2 dark:text-gray-300">Update your post content and title</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-cardLg hover:shadow-cardHover border border-gray-100 overflow-hidden dark:bg-gray-800 dark:border-gray-700">
          <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-7">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Title Field */}
            <div>
              <label htmlFor="title" className="block text-base font-semibold text-gray-800 dark:text-gray-100 mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter your post title"
                className="input"
                required
              />
            </div>

            {/* Content Field */}
            <div>
              <label htmlFor="content" className="block text-base font-semibold text-gray-800 dark:text-gray-100 mb-2">
                Content *
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your post content here..."
                rows={12}
                className="input resize-vertical"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row justify-end gap-4">
              <Link
                to={`/posts/${id}`}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors duration-200 dark:text-gray-200 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary px-6 py-2 flex items-center justify-center w-full sm:w-auto"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  'Update Post'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
