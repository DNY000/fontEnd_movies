import React from 'react';
import { Star, Clock, Play, TrendingUp } from 'lucide-react';
import type { Movie } from '../../types';

interface FeaturedMoviesProps {
  movies: Movie[];
  onMovieSelect: (movie: Movie) => void;
}

const FeaturedMovies: React.FC<FeaturedMoviesProps> = ({ movies, onMovieSelect }) => {
  const featuredMovies = movies.slice(0, 3);

  return (
    <div className="w-full">
      <div className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-bold text-xl">Trending Movies</h3>
          <div className="flex items-center space-x-2 text-gray-400">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm">Top picks</span>
          </div>
        </div>
        
        <div className="space-y-4">
          {featuredMovies.map((movie, index) => (
            <div
              key={movie.id}
              className="group flex items-center space-x-4 p-4 rounded-xl bg-gray-800/40 hover:bg-gray-700/50 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 cursor-pointer"
              onClick={() => onMovieSelect(movie)}
            >
              {/* Rank */}
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
              </div>

              {/* Movie Poster */}
              <div className="relative flex-shrink-0">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-16 h-20 object-cover rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="h-5 w-5 text-white" />
                </div>
              </div>
              
              {/* Movie Info */}
              <div className="flex-1 min-w-0 space-y-2">
                <h4 className="text-white font-semibold text-sm truncate group-hover:text-blue-400 transition-colors">
                  {movie.title}
                </h4>
                
                <div className="flex items-center space-x-3 text-xs">
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-gray-300">{movie.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-300">{movie.duration}m</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {movie.genre.slice(0, 2).map((genre, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-700/50 text-gray-300 px-2 py-0.5 rounded-full"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Price & Action */}
              <div className="flex-shrink-0 text-right space-y-1">
                <div className="text-white font-bold text-sm">
                  {movie.price.toLocaleString()}đ
                </div>
                <div className="text-xs text-gray-400">
                  Book now
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105">
          View All Movies
        </button>
      </div>
    </div>
  );
};

export default FeaturedMovies;
