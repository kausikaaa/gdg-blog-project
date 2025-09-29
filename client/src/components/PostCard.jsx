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
    <div className="group card rounded-2xl shadow-cardLg hover:shadow-cardHover transition-all duration-300 p-5 sm:p-6 border hover:border-accent/40 hover:bg-white/95 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-800/90 hover:-translate-y-0.5">
      <div className="mb-4">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2 line-clamp-2">
          {post.title}
        </h2>
        <div className="h-1 w-12 bg-accent rounded-full mb-3 opacity-80 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="mb-5">
        <p className="text-gray-700 dark:text-gray-200 leading-relaxed line-clamp-3 sm:line-clamp-2">
          {post.content}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
        <div className="flex items-center gap-2">
          <span className="font-medium">By {post.author}</span>
        </div>
        <span>{formatDate(post.datePosted)}</span>
      </div>

      <div className="mt-4 flex justify-end">
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
