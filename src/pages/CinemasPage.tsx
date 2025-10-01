import React, { useState } from 'react';
import { 
  MapPin, Phone, Clock, Star, Navigation, Car, 
  Wifi, Coffee, Utensils, ShoppingBag, Accessibility,
  Film, Calendar, Search, Filter
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Cinema {
  id: string;
  name: string;
  address: string;
  district: string;
  phone: string;
  rating: number;
  reviewCount: number;
  image: string;
  facilities: string[];
  screens: number;
  openTime: string;
  closeTime: string;
  distance: string;
  description: string;
  coordinates: { lat: number; lng: number };
}

const CinemasPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('distance');

  const cinemas: Cinema[] = [
    {
      id: 'cgv-vincom',
      name: 'CGV Vincom Center',
      address: '70-72 Lê Thánh Tôn, Quận 1',
      district: 'Quận 1',
      phone: '1900 6017',
      rating: 4.5,
      reviewCount: 2847,
      image: 'https://images.unsplash.com/photo-1489599735734-79b4169c2a78?w=500',
      facilities: ['parking', 'wifi', 'food', 'shopping', 'accessible'],
      screens: 8,
      openTime: '09:00',
      closeTime: '23:00',
      distance: '1.2 km',
      description: 'Rạp chiếu phim hiện đại với 8 phòng chiếu, âm thanh Dolby Atmos và màn hình IMAX.',
      coordinates: { lat: 10.7769, lng: 106.7009 }
    },
    {
      id: 'lotte-landmark',
      name: 'Lotte Cinema Landmark 81',
      address: '720A Điện Biên Phủ, Quận 1',
      district: 'Quận 1',
      phone: '1900 5555',
      rating: 4.7,
      reviewCount: 3521,
      image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500',
      facilities: ['parking', 'wifi', 'food', 'shopping'],
      screens: 12,
      openTime: '08:30',
      closeTime: '23:30',
      distance: '2.1 km',
      description: 'Rạp chiếu phim cao cấp tại tòa nhà Landmark 81 với tầm nhìn toàn cảnh thành phố.',
      coordinates: { lat: 10.7967, lng: 106.7197 }
    },
    {
      id: 'galaxy-nguyen-du',
      name: 'Galaxy Cinema Nguyễn Du',
      address: '116 Nguyễn Du, Quận 1',
      district: 'Quận 1',
      phone: '1900 2224',
      rating: 4.3,
      reviewCount: 1892,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500',
      facilities: ['wifi', 'food', 'accessible'],
      screens: 6,
      openTime: '09:30',
      closeTime: '22:30',
      distance: '0.8 km',
      description: 'Rạp chiếu phim gia đình với không gian ấm cúng và giá vé hợp lý.',
      coordinates: { lat: 10.7756, lng: 106.6934 }
    },
    {
      id: 'bhd-star',
      name: 'BHD Star Cineplex',
      address: '3/2 Lê Văn Sỹ, Quận 3',
      district: 'Quận 3',
      phone: '1900 2099',
      rating: 4.4,
      reviewCount: 2156,
      image: 'https://images.unsplash.com/photo-1489599735734-79b4169c2a78?w=500',
      facilities: ['parking', 'wifi', 'food'],
      screens: 10,
      openTime: '09:00',
      closeTime: '23:00',
      distance: '3.5 km',
      description: 'Chuỗi rạp chiếu phim nổi tiếng với chất lượng âm thanh và hình ảnh tuyệt vời.',
      coordinates: { lat: 10.7886, lng: 106.6917 }
    },
    {
      id: 'cinestar-hai-ba-trung',
      name: 'Cinestar Hai Bà Trưng',
      address: '135 Hai Bà Trưng, Quận 3',
      district: 'Quận 3',
      phone: '028 3932 4567',
      rating: 4.2,
      reviewCount: 1634,
      image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500',
      facilities: ['wifi', 'food', 'accessible'],
      screens: 7,
      openTime: '10:00',
      closeTime: '22:00',
      distance: '4.2 km',
      description: 'Rạp chiếu phim với thiết kế hiện đại và dịch vụ khách hàng tận tình.',
      coordinates: { lat: 10.7886, lng: 106.6917 }
    },
    {
      id: 'cgv-aeon-mall',
      name: 'CGV Aeon Mall Tân Phú',
      address: '30 Bờ Bao Tân Thắng, Quận 7',
      district: 'Quận 7',
      phone: '1900 6017',
      rating: 4.6,
      reviewCount: 2943,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500',
      facilities: ['parking', 'wifi', 'food', 'shopping', 'accessible'],
      screens: 14,
      openTime: '08:00',
      closeTime: '24:00',
      distance: '8.7 km',
      description: 'Rạp chiếu phim lớn nhất khu vực với đầy đủ tiện ích mua sắm và ăn uống.',
      coordinates: { lat: 10.7411, lng: 106.6818 }
    }
  ];

  const districts = ['all', 'Quận 1', 'Quận 3', 'Quận 7'];
  const sortOptions = [
    { value: 'distance', label: 'Khoảng cách' },
    { value: 'rating', label: 'Đánh giá' },
    { value: 'name', label: 'Tên A-Z' }
  ];

  const facilityIcons: { [key: string]: any } = {
    parking: Car,
    wifi: Wifi,
    food: Utensils,
    shopping: ShoppingBag,
    accessible: Accessibility
  };

  const facilityLabels: { [key: string]: string } = {
    parking: 'Bãi đỗ xe',
    wifi: 'WiFi miễn phí',
    food: 'Đồ ăn & thức uống',
    shopping: 'Khu mua sắm',
    accessible: 'Tiện ích khuyết tật'
  };

  const filteredCinemas = cinemas
    .filter(cinema => {
      const matchesDistrict = selectedDistrict === 'all' || cinema.district === selectedDistrict;
      const matchesSearch = cinema.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           cinema.address.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDistrict && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'distance':
        default:
          return parseFloat(a.distance) - parseFloat(b.distance);
      }
    });

  const handleCinemaClick = (cinemaId: string) => {
    navigate(`/cinemas/${cinemaId}`);
  };

  return (
    <div className="bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Hệ thống rạp chiếu</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Tìm rạp chiếu gần bạn với đầy đủ tiện ích và chất lượng tốt nhất
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
                  placeholder="Tìm kiếm rạp chiếu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            {/* District Filter */}
            <div className="flex flex-wrap gap-2">
              {districts.map((district) => (
                <button
                  key={district}
                  onClick={() => setSelectedDistrict(district)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedDistrict === district
                      ? 'bg-gradient-to-r from-red-600 to-red-500 text-white'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'
                  }`}
                >
                  {district === 'all' ? 'Tất cả quận' : district}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-700/50 border border-gray-600 rounded-lg text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Cinema Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCinemas.map((cinema) => (
            <div
              key={cinema.id}
              onClick={() => handleCinemaClick(cinema.id)}
              className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-gray-600/50 hover:bg-gray-700/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={cinema.image}
                  alt={cinema.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Distance Badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                    <Navigation className="h-3 w-3 inline mr-1" />
                    {cinema.distance}
                  </div>
                </div>

                {/* Rating */}
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-medium">{cinema.rating}</span>
                    <span className="text-gray-300 text-sm ml-1">({cinema.reviewCount})</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-white font-bold text-xl mb-2 group-hover:text-blue-400 transition-colors">
                  {cinema.name}
                </h3>

                <div className="space-y-3 mb-4">
                  <div className="flex items-start text-gray-400 text-sm">
                    <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{cinema.address}</span>
                  </div>

                  <div className="flex items-center text-gray-400 text-sm">
                    <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>{cinema.phone}</span>
                  </div>

                  <div className="flex items-center text-gray-400 text-sm">
                    <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>{cinema.openTime} - {cinema.closeTime}</span>
                  </div>

                  <div className="flex items-center text-gray-400 text-sm">
                    <Film className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>{cinema.screens} phòng chiếu</span>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {cinema.description}
                </p>

                {/* Facilities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {cinema.facilities.map((facility) => {
                    const Icon = facilityIcons[facility];
                    return (
                      <div
                        key={facility}
                        className="flex items-center bg-gray-700/50 text-gray-300 px-2 py-1 rounded-full text-xs"
                        title={facilityLabels[facility]}
                      >
                        <Icon className="h-3 w-3 mr-1" />
                        <span className="hidden sm:inline">{facilityLabels[facility]}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCinemaClick(cinema.id);
                    }}
                    className="flex-1 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                  >
                    Xem lịch chiếu
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle directions
                    }}
                    className="p-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-400 hover:text-white rounded-lg transition-colors"
                    title="Chỉ đường"
                  >
                    <Navigation className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCinemas.length === 0 && (
          <div className="text-center py-16">
            <Film className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              Không tìm thấy rạp chiếu nào
            </h3>
            <p className="text-gray-500">
              Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
            </p>
          </div>
        )}

        {/* Map Section */}
        <div className="mt-16 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Bản đồ rạp chiếu</h2>
          <div className="bg-gray-700/50 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <p className="text-white font-semibold mb-2">Bản đồ tương tác</p>
              <p className="text-gray-400 text-sm">Hiển thị vị trí tất cả rạp chiếu trong khu vực</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CinemasPage;
