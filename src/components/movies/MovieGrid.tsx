import React from 'react';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import MovieCard from './MovieCard';
import type { Movie } from '../../types';

interface MovieGridProps {
  movies: Movie[];
  loading?: boolean;
  error?: string;
  title?: string;
  onBookNow?: (movieId: string) => void;
  onViewDetails?: (movieId: string) => void;
  onRetry?: () => void;
  showBookButton?: boolean;
}

const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  loading = false,
  error,
  title,
  onBookNow,
  onViewDetails,
  onRetry,
  showBookButton = true,
}) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
        <p className="text-gray-600">Đang tải danh sách phim...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <div className="flex items-center mb-4">
            <AlertCircle className="h-6 w-6 text-red-600 mr-2" />
            <h3 className="text-lg font-semibold text-red-800">Không thể tải danh sách phim</h3>
          </div>
          <p className="text-red-700 mb-4">{error}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Thử lại
            </button>
          )}
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-lg font-semibold text-gray-600 mb-2">
          Không tìm thấy phim nào
        </h3>
        <p className="text-gray-500">
          Hãy thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác
        </p>
      </div>
    );
  }

  return (
    <div className="py-6">
      {title && (
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          {title}
        </h2>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onBookNow={onBookNow}
            onViewDetails={onViewDetails}
            showBookButton={showBookButton}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;
