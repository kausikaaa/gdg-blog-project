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
    <div className="card rounded-2xl transition-colors shadow-card hover:shadow-cardHover duration-300 p-5 sm:p-6 border hover:border-accent/40 hover:bg-white/95 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-800/90">
      <div className="mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {post.title}
        </h2>
        <div className="flex flex-wrap items-center gap-x-2 text-sm text-gray-600 dark:text-gray-300 mb-3">
          <span className="font-medium">By {post.author}</span>
          <span className="hidden sm:inline">•</span>
          <span>{formatDate(post.datePosted)}</span>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-700 dark:text-gray-200 line-clamp-4 sm:line-clamp-3">
          {post.content}
        </p>
      </div>
      
      <div className="flex justify-end">
        <Link
          to={`/posts/${post._id}`}
          className="btn-primary"
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
