import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-700">
      {/* Icon or Illustration */}
      <div className="text-blue-500 text-8xl font-bold mb-4">404</div>

      {/* Error Message */}
      <h1 className="text-4xl font-semibold mb-2">Page Not Found</h1>
      <p className="text-lg mb-6">
        Oops! The page you are looking for doesn't exist.
      </p>

      {/* Link to Home */}
      <Link
        to="/"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
      >
        Go Back to Homepage
      </Link>
    </div>
  );
}
