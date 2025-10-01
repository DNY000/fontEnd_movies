import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Film } from 'lucide-react';
import NotificationCenter from '../notifications/NotificationCenter';
import ProfileDropdown from '../profile/ProfileDropdown';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCinema, setSelectedCinema] = useState('');
  const [showCinemaDropdown, setShowCinemaDropdown] = useState(false);
  const navigate = useNavigate();

  const cinemas = [
    { id: 'cgv-vincom', name: 'CGV Vincom Center', address: 'Quận 1, TP.HCM' },
    { id: 'lotte-landmark', name: 'Lotte Cinema Landmark', address: 'Quận 1, TP.HCM' },
    { id: 'galaxy-nguyen-du', name: 'Galaxy Cinema Nguyễn Du', address: 'Quận 1, TP.HCM' },
    { id: 'bhd-star', name: 'BHD Star Cineplex', address: 'Quận 3, TP.HCM' },
    { id: 'cinestar-hai-ba-trung', name: 'Cinestar Hai Bà Trưng', address: 'Quận 3, TP.HCM' },
    { id: 'cgv-aeon-mall', name: 'CGV Aeon Mall', address: 'Quận 7, TP.HCM' }
  ];

  const navigationItems = [
    { label: 'Trang chủ', href: '/', active: true },
    { label: 'Phim', href: '/movies' },
    { label: 'Rạp chiếu', href: '/cinemas', hasDropdown: true },
    { label: 'Tin tức', href: '/news' },
    { label: 'Khuyến mãi', href: '/promotions' },
    { label: 'Liên hệ', href: '/contact' },
    { label: 'Admin', href: '/admin', isAdmin: true }
  ];

  const handleCinemaSelect = (cinema: any) => {
    setSelectedCinema(cinema.id);
    setShowCinemaDropdown(false);
    navigate(`/cinemas/${cinema.id}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-500 rounded-lg flex items-center justify-center">
              <Film className="h-5 w-5 text-white" />
            </div>
            <span className="text-white font-bold text-xl">CinemaBooking</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div key={item.href} className="relative">
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setShowCinemaDropdown(true)}
                    onMouseLeave={() => setShowCinemaDropdown(false)}
                  >
                    <Link
                      to={item.href}
                      className={`text-sm font-medium transition-colors flex items-center ${
                        item.active
                          ? 'text-white border-b-2 border-red-500 pb-1'
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {item.label}
                      <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>
                    
                    {/* Cinema Dropdown */}
                    {showCinemaDropdown && (
                      <div className="absolute top-full left-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-xl shadow-xl z-50">
                        <div className="p-4">
                          <h3 className="text-white font-semibold mb-3">Chọn rạp chiếu</h3>
                          <div className="space-y-2 max-h-64 overflow-y-auto">
                            {cinemas.map((cinema) => (
                              <button
                                key={cinema.id}
                                onClick={() => handleCinemaSelect(cinema)}
                                className={`w-full text-left p-3 rounded-lg transition-colors ${
                                  selectedCinema === cinema.id
                                    ? 'bg-red-600 text-white'
                                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'
                                }`}
                              >
                                <div className="font-medium">{cinema.name}</div>
                                <div className="text-sm opacity-75">{cinema.address}</div>
                              </button>
                            ))}
                          </div>
                          <div className="mt-3 pt-3 border-t border-gray-700">
                            <Link
                              to="/cinemas"
                              className="block text-center text-blue-400 hover:text-blue-300 text-sm font-medium"
                              onClick={() => setShowCinemaDropdown(false)}
                            >
                              Xem tất cả rạp chiếu →
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={`text-sm font-medium transition-colors ${
                      item.active
                        ? 'text-white border-b-2 border-red-500 pb-1'
                        : item.isAdmin
                        ? 'text-blue-400 hover:text-blue-300 font-semibold'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm phim..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </form>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <NotificationCenter />

            {/* Profile */}
            <ProfileDropdown />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-800 py-4">
            {/* Mobile Search */}
            <div className="mb-4">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm phim..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </form>
            </div>

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    item.active
                      ? 'text-white bg-red-600/20 border-l-4 border-red-500'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
