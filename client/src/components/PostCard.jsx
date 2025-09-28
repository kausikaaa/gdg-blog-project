import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  // Format the date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {post.title}
        </h2>
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <span className="font-medium">By {post.author}</span>
          <span className="mx-2">•</span>
          <span>{formatDate(post.datePosted)}</span>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-700 line-clamp-3">
          {post.content}
        </p>
      </div>
      
      <div className="flex justify-end">
        <Link
          to={`/posts/${post._id}`}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Read More
          <svg
            className="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
