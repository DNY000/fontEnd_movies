import React, { useState, useEffect } from 'react';
import {
  Play,
  Clock,
  Calendar,
  Globe,
  User,
  MapPin,
  Star,
  Loader2,
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/common/ErrorMessage';
import { mockMovies, mockShowtimes } from '../data/mockData';
import type { Movie, MovieShowtime } from '../types';

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showtimes, setShowtimes] = useState<MovieShowtime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (id) {
      loadMovieData();
    }
  }, [id, selectedDate]);

  const loadMovieData = async () => {
    try {
      setLoading(true);
      // For demo, use mock data
      const foundMovie = mockMovies.find(m => m.id === id);
      if (foundMovie) {
        setMovie(foundMovie);
        setShowtimes(mockShowtimes.filter(st => st.movieId === id));
      } else {
        setError('Không tìm thấy phim');
      }
    } catch (err) {
      setError('Không thể tải thông tin phim');
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const handleBookShowtime = (showtimeId: string) => {
    navigate(`/booking/${showtimeId}`);
  };

  const getNext7Days = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating / 2);
    const hasHalfStar = rating % 2 >= 1;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="h-5 w-5 fill-yellow-400/50 text-yellow-400" />);
      } else {
        stars.push(<Star key={i} className="h-5 w-5 text-gray-300" />);
      }
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
        <p className="text-gray-600">Đang tải thông tin phim...</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <ErrorMessage
        message={error || 'Không tìm thấy phim'}
        title="Lỗi tải dữ liệu"
        onRetry={loadMovieData}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Movie Poster */}
        <div className="md:col-span-1">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full rounded-xl shadow-lg"
          />
        </div>

        {/* Movie Info */}
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {movie.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {renderStars(movie.rating)}
            </div>
            <span className="ml-2 text-lg font-semibold text-gray-700">
              {movie.rating}/10
            </span>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 mb-6">
            {movie.genre.map((genre) => (
              <span
                key={genre}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Movie Details */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center text-gray-600">
              <Clock className="h-5 w-5 mr-2" />
              <span>Thời lượng: {formatDuration(movie.duration)}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="h-5 w-5 mr-2" />
              <span>Ngày khởi chiếu: {formatDate(movie.releaseDate)}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Globe className="h-5 w-5 mr-2" />
              <span>Ngôn ngữ: {movie.language}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <User className="h-5 w-5 mr-2" />
              <span>Đạo diễn: {movie.director}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Nội dung phim
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {movie.description}
            </p>
          </div>

          {/* Cast */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Diễn viên
            </h2>
            <p className="text-gray-600">
              {movie.cast.join(', ')}
            </p>
          </div>

          {/* Trailer Button */}
          {movie.trailerUrl && (
            <button
              onClick={() => window.open(movie.trailerUrl, '_blank')}
              className="flex items-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors mb-6"
            >
              <Play className="h-4 w-4 mr-2" />
              Xem trailer
            </button>
          )}

          {/* Price */}
          <div className="text-2xl font-bold text-blue-600">
            {movie.price.toLocaleString('vi-VN')} VNĐ
          </div>
        </div>
      </div>

      {/* Showtimes */}
      {movie.status === 'now_showing' && (
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Lịch chiếu
          </h2>

          {/* Date Selector */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Chọn ngày
            </h3>
            <div className="flex flex-wrap gap-2">
              {getNext7Days().map((date) => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedDate === date
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {new Date(date).toLocaleDateString('vi-VN', { 
                    weekday: 'short', 
                    day: 'numeric',
                    month: 'numeric'
                  })}
                </button>
              ))}
            </div>
          </div>

          {/* Showtimes List */}
          {showtimes.length > 0 ? (
            <div className="space-y-4">
              {Object.entries(
                showtimes.reduce((acc, showtime) => {
                  const theaterName = showtime.theaterName;
                  if (!acc[theaterName]) {
                    acc[theaterName] = [];
                  }
                  acc[theaterName].push(showtime);
                  return acc;
                }, {} as Record<string, MovieShowtime[]>)
              ).map(([theaterName, theaterShowtimes]) => (
                <div key={theaterName} className="border rounded-lg p-4">
                  <div className="flex items-center mb-4">
                    <MapPin className="h-5 w-5 mr-2 text-gray-600" />
                    <h4 className="text-lg font-semibold text-gray-900">{theaterName}</h4>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {theaterShowtimes.map((showtime) => (
                      <button
                        key={showtime.id}
                        onClick={() => handleBookShowtime(showtime.id)}
                        disabled={showtime.availableSeats === 0}
                        className={`min-w-[100px] p-3 border rounded-lg text-center transition-colors ${
                          showtime.availableSeats === 0
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'border-blue-200 hover:border-blue-400 hover:bg-blue-50'
                        }`}
                      >
                        <div className="font-semibold text-sm">
                          {showtime.showTime}
                        </div>
                        <div className="text-xs text-gray-500">
                          Phòng {showtime.screenNumber}
                        </div>
                        <div className="text-xs text-gray-500">
                          {showtime.availableSeats} ghế trống
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              Không có suất chiếu nào cho ngày đã chọn
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
