import { useState, useEffect } from 'react';
import { fetchAllPosts } from '../../api/posts';
import PostCard from '../../components/PostCard';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchAllPosts();
        setPosts(response.data);
      } catch (err) {
        console.error('Error loading posts:', err);
        setError('Failed to load posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

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
        <p className="text-red-600">{message}</p>
      </div>
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="flex justify-center items-center py-12">
      <div className="text-center">
        <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
        <p className="text-gray-500">Be the first to create a blog post!</p>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between gap-4">
          <div className="flex-1 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 dark:text-white">Blog Posts</h1>
            <p className="text-gray-600 dark:text-gray-300">Discover the latest stories and insights</p>
          </div>
          {isAuthenticated && (
            <Link to="/create" className="btn-primary hidden sm:inline-flex">New Post</Link>
          )}
        </div>

        {/* Content */}
        {loading && <LoadingSpinner />}
        
        {error && <ErrorMessage message={error} />}
        
        {!loading && !error && posts.length === 0 && <EmptyState />}
        
        {!loading && !error && posts.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
