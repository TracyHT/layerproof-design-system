import { useNavigate } from 'react-router';
import { Home } from 'lucide-react';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-8 py-24">
      <div className="text-center max-w-2xl mx-auto">
        <div className="text-8xl font-bold text-indigo-600 mb-4">404</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-xl text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="brand-btn brand-btn-primary flex items-center gap-2"
          >
            <Home size={20} />
            Back to Home
          </button>
          <button
            onClick={() => navigate('/brand-assets')}
            className="px-6 py-2.5 bg-white text-gray-700 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-all duration-200"
          >
            View Brand Assets
          </button>
        </div>
      </div>
    </div>
  );
}
