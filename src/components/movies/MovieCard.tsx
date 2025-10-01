import React from 'react';
import { Play, Clock, Calendar, Star } from 'lucide-react';
import type { Movie } from '../../types';

interface MovieCardProps {
  movie: Movie;
  onBookNow?: (movieId: string) => void;
  onViewDetails?: (movieId: string) => void;
  showBookButton?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onBookNow,
  onViewDetails,
  showBookButton = true,
}) => {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating / 2);
    const hasHalfStar = rating % 2 >= 1;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400/50 text-yellow-400" />);
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      {/* Movie Poster */}
      <div className="relative">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
          {movie.status === 'now_showing' ? 'Đang chiếu' : 'Sắp chiếu'}
        </div>
      </div>

      {/* Movie Info */}
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
          {movie.title}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {renderStars(movie.rating)}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            {movie.rating}/10
          </span>
        </div>

        {/* Duration */}
        <div className="flex items-center mb-2 text-gray-600">
          <Clock className="h-4 w-4 mr-1" />
          <span className="text-sm">{formatDuration(movie.duration)}</span>
        </div>

        {/* Release Date */}
        <div className="flex items-center mb-3 text-gray-600">
          <Calendar className="h-4 w-4 mr-1" />
          <span className="text-sm">{formatDate(movie.releaseDate)}</span>
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-1 mb-3">
          {movie.genre.slice(0, 2).map((genre) => (
            <span
              key={genre}
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow">
          {movie.description}
        </p>

        {/* Price */}
        <div className="text-lg font-bold text-blue-600 mb-4">
          {movie.price.toLocaleString('vi-VN')} VNĐ
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-auto">
          <button
            onClick={() => onViewDetails?.(movie.id)}
            className="flex items-center px-3 py-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <Play className="h-4 w-4 mr-1" />
            Chi tiết
          </button>
          
          {showBookButton && movie.status === 'now_showing' && (
            <button
              onClick={() => onBookNow?.(movie.id)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Đặt vé
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
