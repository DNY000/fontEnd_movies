import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Film, Ticket, Download, Star, Filter, Search } from 'lucide-react';

interface Booking {
  id: string;
  movieTitle: string;
  moviePoster: string;
  cinema: string;
  date: string;
  time: string;
  seats: string[];
  totalPrice: number;
  status: 'completed' | 'upcoming' | 'cancelled';
  bookingDate: string;
  rating?: number;
}

const BookingHistoryPage: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const bookings: Booking[] = [
    {
      id: 'BK001',
      movieTitle: 'Avatar: The Way of Water',
      moviePoster: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
      cinema: 'CGV Vincom Center',
      date: '2023-10-20',
      time: '19:30',
      seats: ['A5', 'A6'],
      totalPrice: 200000,
      status: 'upcoming',
      bookingDate: '2023-10-15'
    },
    {
      id: 'BK002',
      movieTitle: 'Black Panther: Wakanda Forever',
      moviePoster: 'https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg',
      cinema: 'Lotte Cinema Landmark',
      date: '2023-10-10',
      time: '21:00',
      seats: ['B8', 'B9'],
      totalPrice: 180000,
      status: 'completed',
      bookingDate: '2023-10-08',
      rating: 5
    },
    {
      id: 'BK003',
      movieTitle: 'Top Gun: Maverick',
      moviePoster: 'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg',
      cinema: 'Galaxy Cinema Nguyễn Du',
      date: '2023-09-25',
      time: '16:45',
      seats: ['C10'],
      totalPrice: 120000,
      status: 'completed',
      bookingDate: '2023-09-20',
      rating: 4
    },
    {
      id: 'BK004',
      movieTitle: 'Doctor Strange 2',
      moviePoster: 'https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg',
      cinema: 'BHD Star Cineplex',
      date: '2023-09-15',
      time: '14:30',
      seats: ['D5', 'D6'],
      totalPrice: 160000,
      status: 'cancelled',
      bookingDate: '2023-09-10'
    }
  ];

  const statusOptions = [
    { id: 'all', label: 'Tất cả', count: bookings.length },
    { id: 'upcoming', label: 'Sắp tới', count: bookings.filter(b => b.status === 'upcoming').length },
    { id: 'completed', label: 'Đã xem', count: bookings.filter(b => b.status === 'completed').length },
    { id: 'cancelled', label: 'Đã hủy', count: bookings.filter(b => b.status === 'cancelled').length }
  ];

  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = selectedStatus === 'all' || booking.status === selectedStatus;
    const matchesSearch = booking.movieTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.cinema.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'upcoming': return 'Sắp tới';
      case 'completed': return 'Đã xem';
      case 'cancelled': return 'Đã hủy';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + 'đ';
  };

  return (
    <div className="bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Lịch sử đặt vé</h1>
          <p className="text-gray-400">Quản lý và theo dõi các vé đã đặt</p>
        </div>

        {/* Filters */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Status Filter */}
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedStatus(option.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedStatus === option.id
                      ? 'bg-gradient-to-r from-red-600 to-red-500 text-white'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'
                  }`}
                >
                  <span>{option.label}</span>
                  <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                    {option.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm phim hoặc rạp..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 w-full lg:w-80"
              />
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {filteredBookings.length === 0 ? (
            <div className="text-center py-12">
              <Ticket className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                Không tìm thấy vé nào
              </h3>
              <p className="text-gray-500">
                {searchQuery ? 'Thử tìm kiếm với từ khóa khác' : 'Bạn chưa đặt vé nào'}
              </p>
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600/50 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Movie Poster */}
                  <div className="flex-shrink-0">
                    <img
                      src={booking.moviePoster}
                      alt={booking.movieTitle}
                      className="w-24 h-32 object-cover rounded-lg"
                    />
                  </div>

                  {/* Booking Details */}
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">
                          {booking.movieTitle}
                        </h3>
                        <div className="flex items-center space-x-4 text-gray-400 text-sm">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {booking.cinema}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(booking.date)}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {booking.time}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(booking.status)}`}>
                          {getStatusLabel(booking.status)}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm">Ghế ngồi</p>
                        <p className="text-white font-medium">
                          {booking.seats.join(', ')}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Tổng tiền</p>
                        <p className="text-white font-bold text-lg">
                          {formatPrice(booking.totalPrice)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Mã đặt vé</p>
                        <p className="text-white font-mono">
                          {booking.id}
                        </p>
                      </div>
                    </div>

                    {/* Rating */}
                    {booking.status === 'completed' && (
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-400 text-sm">Đánh giá của bạn:</span>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < (booking.rating || 0)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-600'
                              }`}
                            />
                          ))}
                          {booking.rating && (
                            <span className="text-white text-sm ml-2">
                              {booking.rating}/5
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-700/50">
                      {booking.status === 'upcoming' && (
                        <>
                          <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                            <Download className="h-4 w-4 mr-2" />
                            Tải vé
                          </button>
                          <button className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                            Hủy vé
                          </button>
                        </>
                      )}
                      
                      {booking.status === 'completed' && (
                        <>
                          <button className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                            <Download className="h-4 w-4 mr-2" />
                            Tải hóa đơn
                          </button>
                          <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                            Đặt lại
                          </button>
                          {!booking.rating && (
                            <button className="flex items-center bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                              <Star className="h-4 w-4 mr-2" />
                              Đánh giá
                            </button>
                          )}
                        </>
                      )}

                      {booking.status === 'cancelled' && (
                        <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                          Đặt lại
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {filteredBookings.length > 0 && (
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-600/50 transition-colors">
                Trước
              </button>
              <span className="px-4 py-2 bg-red-600 text-white rounded-lg">1</span>
              <button className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-600/50 transition-colors">
                2
              </button>
              <button className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-600/50 transition-colors">
                Sau
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingHistoryPage;
