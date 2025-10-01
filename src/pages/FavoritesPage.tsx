import React, { useState } from 'react';
import { Heart, Star, Calendar, Clock, Play, Trash2, Share2, Filter, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FavoriteMovie {
  id: string;
  title: string;
  poster: string;
  rating: number;
  releaseDate: string;
  duration: number;
  genre: string[];
  description: string;
  addedDate: string;
  status: 'now_showing' | 'coming_soon' | 'ended';
}

const FavoritesPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const favoriteMovies: FavoriteMovie[] = [
    {
      id: '1',
      title: 'Avatar: The Way of Water',
      poster: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
      rating: 8.5,
      releaseDate: '2022-12-16',
      duration: 192,
      genre: ['Sci-Fi', 'Action', 'Adventure'],
      description: 'Set more than a decade after the events of the first film, Avatar: The Way of Water begins to tell the story of the Sully family.',
      addedDate: '2023-10-15',
      status: 'now_showing'
    },
    {
      id: '2',
      title: 'Black Panther: Wakanda Forever',
      poster: 'https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg',
      rating: 7.8,
      releaseDate: '2022-11-11',
      duration: 161,
      genre: ['Action', 'Adventure', 'Drama'],
      description: 'Queen Ramonda, Shuri, M\'Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers.',
      addedDate: '2023-10-10',
      status: 'now_showing'
    },
    {
      id: '3',
      title: 'Top Gun: Maverick',
      poster: 'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg',
      rating: 8.9,
      releaseDate: '2022-05-27',
      duration: 130,
      genre: ['Action', 'Drama'],
      description: 'After thirty years, Maverick is still pushing the envelope as a top naval aviator.',
      addedDate: '2023-09-25',
      status: 'ended'
    },
    {
      id: '4',
      title: 'Spider-Man: No Way Home',
      poster: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
      rating: 9.2,
      releaseDate: '2024-01-15',
      duration: 148,
      genre: ['Action', 'Adventure', 'Sci-Fi'],
      description: 'Spider-Man seeks the help of Doctor Strange to forget his exposed secret identity as Peter Parker.',
      addedDate: '2023-10-01',
      status: 'coming_soon'
    }
  ];

  const genres = ['all', ...Array.from(new Set(favoriteMovies.flatMap(movie => movie.genre)))];
  const statuses = [
    { id: 'all', label: 'Tất cả' },
    { id: 'now_showing', label: 'Đang chiếu' },
    { id: 'coming_soon', label: 'Sắp chiếu' },
    { id: 'ended', label: 'Đã kết thúc' }
  ];

  const filteredMovies = favoriteMovies.filter(movie => {
    const matchesGenre = selectedGenre === 'all' || movie.genre.includes(selectedGenre);
    const matchesStatus = selectedStatus === 'all' || movie.status === selectedStatus;
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesStatus && matchesSearch;
  });

  const handleRemoveFavorite = (movieId: string) => {
    // Remove from favorites logic
    console.log('Remove favorite:', movieId);
  };

  const handleShare = (movie: FavoriteMovie) => {
    // Share movie logic
    console.log('Share movie:', movie.title);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'now_showing': return 'bg-green-500/20 text-green-400';
      case 'coming_soon': return 'bg-blue-500/20 text-blue-400';
      case 'ended': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'now_showing': return 'Đang chiếu';
      case 'coming_soon': return 'Sắp chiếu';
      case 'ended': return 'Đã kết thúc';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <div className="bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Phim yêu thích</h1>
          <p className="text-gray-400">
            Bạn có {favoriteMovies.length} bộ phim trong danh sách yêu thích
          </p>
        </div>

        {/* Filters */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm phim yêu thích..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Genre Filter */}
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedGenre === genre
                      ? 'bg-gradient-to-r from-red-600 to-red-500 text-white'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'
                  }`}
                >
                  {genre === 'all' ? 'Tất cả thể loại' : genre}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => (
                <button
                  key={status.id}
                  onClick={() => setSelectedStatus(status.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedStatus === status.id
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-gray-700/50 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 rounded-md text-sm transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Lưới
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 rounded-md text-sm transition-colors ${
                  viewMode === 'list'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Danh sách
              </button>
            </div>
          </div>
        </div>

        {/* Movies */}
        {filteredMovies.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              Không tìm thấy phim nào
            </h3>
            <p className="text-gray-500 mb-6">
              {searchQuery ? 'Thử tìm kiếm với từ khóa khác' : 'Danh sách yêu thích của bạn đang trống'}
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              Khám phá phim mới
            </button>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-6'
          }>
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className={`group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-gray-600/50 hover:bg-gray-700/50 transition-all duration-300 ${
                  viewMode === 'list' ? 'flex gap-6 p-6' : 'transform hover:-translate-y-2'
                }`}
              >
                {/* Movie Poster */}
                <div className={`relative overflow-hidden ${
                  viewMode === 'list' ? 'w-32 h-44 flex-shrink-0' : 'h-64'
                }`}>
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(movie.status)}`}>
                      {getStatusLabel(movie.status)}
                    </span>
                  </div>

                  {/* Favorite Heart */}
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => handleRemoveFavorite(movie.id)}
                      className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </button>
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      onClick={() => navigate(`/movies/${movie.id}`)}
                      className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-colors"
                    >
                      <Play className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                {/* Movie Info */}
                <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                    {movie.title}
                  </h3>

                  <div className="flex items-center space-x-4 mb-3 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>{movie.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{movie.duration}p</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(movie.releaseDate).getFullYear()}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {movie.genre.slice(0, 3).map((genre, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded-full"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>

                  {viewMode === 'list' && (
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {movie.description}
                    </p>
                  )}

                  <div className="text-xs text-gray-500 mb-4">
                    Đã thêm: {formatDate(movie.addedDate)}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/movies/${movie.id}`)}
                      className="flex-1 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300"
                    >
                      Xem chi tiết
                    </button>
                    <button
                      onClick={() => handleShare(movie)}
                      className="p-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-400 hover:text-white rounded-lg transition-colors"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More */}
        {filteredMovies.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-gray-700/50 hover:bg-gray-600/50 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Tải thêm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
