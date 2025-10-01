import React from 'react';
import { TrendingUp, Star, Play } from 'lucide-react';
import type { Movie } from '../../types';

interface TrendingSectionProps {
  movies: Movie[];
  onMovieClick: (movieId: string) => void;
}

const TrendingSection: React.FC<TrendingSectionProps> = ({ movies, onMovieClick }) => {
  const trendingMovies = movies.slice(0, 6);

  return (
    <div className="bg-gray-800 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="h-8 w-8 text-red-500 mr-3" />
            <h2 className="text-4xl font-bold text-white">Đang Thịnh Hành</h2>
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Những bộ phim được yêu thích nhất hiện tại
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingMovies.map((movie, index) => (
            <div
              key={movie.id}
              className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-gray-600/50 hover:bg-gray-800/50 transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Rank Badge */}
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-gradient-to-r from-red-600 to-red-500 text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-lg">
                  {index + 1}
                </div>
              </div>

              {/* Movie Poster */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <button
                      onClick={() => onMovieClick(movie.id)}
                      className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center transition-all duration-300 transform hover:scale-105"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Đặt Vé Ngay
                    </button>
                  </div>
                </div>
              </div>

              {/* Movie Info */}
              <div className="p-6">
                <h3 className="font-bold text-lg text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {movie.title}
                </h3>
                
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-300">{movie.rating}</span>
                  </div>
                  <span className="text-sm text-gray-400">{movie.duration} phút</span>
                  <span className="text-sm text-gray-400">{movie.releaseDate.split('-')[0]}</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {movie.genre.slice(0, 3).map((genre, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded-full border border-gray-600/30"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                  {movie.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-red-500">
                    {movie.price.toLocaleString()}đ
                  </div>
                  <button
                    onClick={() => onMovieClick(movie.id)}
                    className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    Xem chi tiết →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25">
            Xem Thêm Phim Trending
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrendingSection;
