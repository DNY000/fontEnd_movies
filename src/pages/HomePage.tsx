import React, { useState, useEffect } from 'react';
import { Search, Film, Calendar, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MovieGrid from '../components/movies/MovieGrid';
import MovieCarousel from '../components/home/MovieCarousel';
import QuickFilter from '../components/home/QuickFilter';
import QuickActions from '../components/home/QuickActions';
import TrendingSection from '../components/home/TrendingSection';
import NewsSection from '../components/news/NewsSection';
import PromotionsSection from '../components/promotions/PromotionsSection';
import { mockMovies } from '../data/mockData';
import type { Movie } from '../types';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: 'Đang chiếu', icon: Film, value: 'now_showing' },
    { label: 'Sắp chiếu', icon: Calendar, value: 'coming_soon' },
    { label: 'Phổ biến', icon: TrendingUp, value: 'popular' },
  ];

  useEffect(() => {
    loadMovies();
  }, [activeTab]);

  const loadMovies = async () => {
    try {
      setLoading(true);
      setError('');
      
      // For demo purposes, use mock data directly
      let filteredMovies = mockMovies;
      
      switch (tabs[activeTab].value) {
        case 'now_showing':
          filteredMovies = mockMovies.filter(movie => movie.status === 'now_showing');
          break;
        case 'coming_soon':
          filteredMovies = mockMovies.filter(movie => movie.status === 'coming_soon');
          break;
        case 'popular':
          // Sort by rating for popular movies
          filteredMovies = [...mockMovies].sort((a, b) => b.rating - a.rating);
          break;
        default:
          filteredMovies = mockMovies.filter(movie => movie.status === 'now_showing');
      }
      
      setMovies(filteredMovies);
    } catch (err) {
      setError('Đã xảy ra lỗi khi tải dữ liệu');
      setMovies(mockMovies);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadMovies(); // Reset to original list
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // Search in mock data
      const searchResults = mockMovies.filter(movie => 
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      
      setMovies(searchResults);
    } catch (err) {
      setError('Không thể tìm kiếm phim');
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = (movieId: string) => {
    navigate(`/movies/${movieId}/showtimes`);
  };

  const handleViewDetails = (movieId: string) => {
    navigate(`/movies/${movieId}`);
  };

  const handleMovieSelect = (movieId: string) => {
    navigate(`/movies/${movieId}`);
  };

  const handleTrendingMovieClick = (movieId: string) => {
    navigate(`/movies/${movieId}`);
  };

  const handleFilterChange = (filters: any) => {
    console.log('Filter changed:', filters);
    // Handle filter logic here
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Movie Carousel Banner */}
      <MovieCarousel 
        movies={mockMovies}
        onMovieSelect={handleMovieSelect}
      />

      {/* Search and Filter Section */}
      <div className="bg-gray-900 py-12">
        <div className="container mx-auto px-4 space-y-8">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-2">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm phim, diễn viên, đạo diễn..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full pl-12 pr-16 py-4 bg-transparent text-white placeholder-gray-400 text-lg focus:outline-none"
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white p-3 rounded-xl transition-all duration-300"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Filter */}
          <QuickFilter onFilterChange={handleFilterChange} />
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Trending Section */}
      <TrendingSection 
        movies={mockMovies} 
        onMovieClick={handleTrendingMovieClick}
      />

      {/* Promotions Section */}
      <PromotionsSection />

      {/* News Section */}
      <NewsSection />

      {/* Movie Tabs */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Danh Sách Phim</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Khám phá những bộ phim mới nhất và phổ biến nhất
            </p>
          </div>
          
          <div className="flex justify-center mb-8">
            <div className="flex space-x-1 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 p-1 rounded-xl">
              {tabs.map((tab, index) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`flex items-center px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeTab === index
                        ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Movies Grid */}
          <MovieGrid
            movies={movies}
            loading={loading}
            error={error}
            onBookNow={handleBookNow}
            onViewDetails={handleViewDetails}
            onRetry={loadMovies}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
