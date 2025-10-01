import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Clock, Calendar, Play } from 'lucide-react';
import type { Movie } from '../../types';

interface MovieCarouselProps {
  movies: Movie[];
  onMovieSelect: (movieId: string) => void;
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ movies, onMovieSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredMovies = movies.slice(0, 5);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredMovies.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
  };

  if (featuredMovies.length === 0) return null;

  const currentMovie = featuredMovies[currentIndex];

  return (
    <div className="relative h-[70vh] overflow-hidden">
      {/* Background Images */}
      {featuredMovies.map((movie, index) => (
        <div
          key={movie.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/90"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl">
          {/* Category Badge */}
          <div className="flex items-center space-x-4 mb-6">
            <span className="bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
              Featured #{currentIndex + 1}
            </span>
            <div className="flex items-center space-x-2 text-gray-400">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm">Now Playing</span>
            </div>
          </div>
          
          {/* Movie Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            {currentMovie.title}
          </h1>
          
          {/* Movie Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-gray-300 mb-6">
            <div className="flex items-center space-x-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span className="text-white font-semibold">{currentMovie.rating}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{currentMovie.duration}m</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{currentMovie.releaseDate.split('-')[0]}</span>
            </div>

            <div className="bg-gray-800/50 px-3 py-1 rounded-full text-sm">
              4K Ultra HD
            </div>
          </div>

          {/* Genre Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {currentMovie.genre.slice(0, 4).map((genre) => (
              <span key={genre} className="bg-gray-800/60 border border-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-gray-700/60 transition-colors">
                {genre}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-xl">
            {currentMovie.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => onMovieSelect(currentMovie.id)}
              className="group flex items-center justify-center bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
            >
              <Play className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform" />
              Đặt Vé Ngay
            </button>
            
            <button className="flex items-center justify-center bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 hover:border-gray-600 text-white px-8 py-4 rounded-xl font-semibold text-lg backdrop-blur-sm transition-all duration-300">
              <Play className="h-6 w-6 mr-3" />
              Xem Trailer
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {featuredMovies.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-red-500 scale-125'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Movie Thumbnails */}
      <div className="absolute bottom-8 right-8 hidden lg:flex space-x-2">
        {featuredMovies.map((movie, index) => (
          <button
            key={movie.id}
            onClick={() => goToSlide(index)}
            className={`relative w-16 h-20 rounded-lg overflow-hidden transition-all duration-300 ${
              index === currentIndex
                ? 'ring-2 ring-red-500 scale-110'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel;
