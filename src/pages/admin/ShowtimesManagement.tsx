import React, { useState } from 'react';
import { 
  Plus, Search, Filter, Edit, Trash2, Calendar,
  Clock, Film, MapPin, Users, Save, X
} from 'lucide-react';
import type { Movie } from '../../types/movie';

interface Showtime {
  id: string;
  movie: {
    id: string;
    title: string;
    poster: string;
    duration: number;
  };
  cinema: {
    id: string;
    name: string;
    screen: string;
    capacity: number;
  };
  date: string;
  time: string;
  price: number;
  bookedSeats: number;
  status: 'active' | 'cancelled' | 'completed';
}

const ShowtimesManagement: React.FC = () => {
  const [showtimes, setShowtimes] = useState<Showtime[]>([
    {
      id: '1',
      movie: {
        id: '1',
        title: 'Avatar: The Way of Water',
        poster: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
        duration: 192
      },
      cinema: {
        id: '1',
        name: 'CGV Vincom Center',
        screen: 'Phòng 1',
        capacity: 150
      },
      date: '2023-10-20',
      time: '19:30',
      price: 100000,
      bookedSeats: 85,
      status: 'active'
    },
    {
      id: '2',
      movie: {
        id: '2',
        title: 'Black Panther: Wakanda Forever',
        poster: 'https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg',
        duration: 161
      },
      cinema: {
        id: '2',
        name: 'Lotte Cinema Landmark',
        screen: 'Phòng 3',
        capacity: 200
      },
      date: '2023-10-21',
      time: '21:00',
      price: 120000,
      bookedSeats: 145,
      status: 'active'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCinema, setSelectedCinema] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingShowtime, setEditingShowtime] = useState<Showtime | null>(null);
  const [formData, setFormData] = useState<Partial<Showtime>>({});

  const cinemaOptions = [
    { value: 'all', label: 'Tất cả rạp' },
    { value: '1', label: 'CGV Vincom Center' },
    { value: '2', label: 'Lotte Cinema Landmark' },
    { value: '3', label: 'Galaxy Cinema Nguyễn Du' }
  ];

  const movieOptions = [
    { id: '1', title: 'Avatar: The Way of Water', duration: 192 },
    { id: '2', title: 'Black Panther: Wakanda Forever', duration: 161 },
    { id: '3', title: 'Top Gun: Maverick', duration: 130 }
  ];

  const filteredShowtimes = showtimes.filter(showtime => {
    const matchesSearch = showtime.movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         showtime.cinema.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = !selectedDate || showtime.date === selectedDate;
    const matchesCinema = selectedCinema === 'all' || showtime.cinema.id === selectedCinema;
    return matchesSearch && matchesDate && matchesCinema;
  });

  const handleAddShowtime = () => {
    setEditingShowtime(null);
    setFormData({
      date: '',
      time: '',
      price: 100000,
      status: 'active'
    });
    setShowModal(true);
  };

  const handleEditShowtime = (showtime: Showtime) => {
    setEditingShowtime(showtime);
    setFormData(showtime);
    setShowModal(true);
  };

  const handleDeleteShowtime = (showtimeId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa lịch chiếu này?')) {
      setShowtimes(showtimes.filter(showtime => showtime.id !== showtimeId));
    }
  };

  const handleSaveShowtime = () => {
    if (editingShowtime) {
      setShowtimes(showtimes.map(showtime => 
        showtime.id === editingShowtime.id ? { ...showtime, ...formData } : showtime
      ));
    } else {
      const newShowtime: Showtime = {
        ...formData as Showtime,
        id: Date.now().toString(),
        bookedSeats: 0
      };
      setShowtimes([...showtimes, newShowtime]);
    }
    setShowModal(false);
    setFormData({});
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Đang bán';
      case 'cancelled': return 'Đã hủy';
      case 'completed': return 'Hoàn thành';
      default: return status;
    }
  };

  const getOccupancyColor = (percentage: number) => {
    if (percentage >= 80) return 'text-red-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quản lý lịch chiếu</h2>
          <p className="mt-1 text-sm text-gray-600">
            Tạo và quản lý lịch chiếu cho tất cả rạp
          </p>
        </div>
        <button
          onClick={handleAddShowtime}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Thêm lịch chiếu</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-blue-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Tổng lịch chiếu</p>
              <p className="text-2xl font-semibold text-gray-900">{showtimes.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-green-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Đang bán vé</p>
              <p className="text-2xl font-semibold text-gray-900">
                {showtimes.filter(s => s.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Vé đã bán</p>
              <p className="text-2xl font-semibold text-gray-900">
                {showtimes.reduce((sum, s) => sum + s.bookedSeats, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Film className="h-8 w-8 text-orange-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Tỷ lệ lấp đầy</p>
              <p className="text-2xl font-semibold text-gray-900">
                {Math.round(
                  (showtimes.reduce((sum, s) => sum + s.bookedSeats, 0) /
                   showtimes.reduce((sum, s) => sum + s.cinema.capacity, 0)) * 100
                )}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm phim hoặc rạp..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={selectedCinema}
              onChange={(e) => setSelectedCinema(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {cinemaOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Showtimes Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phim
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rạp & Phòng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lịch chiếu
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Giá vé
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tình trạng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredShowtimes.map((showtime) => {
              const occupancyRate = (showtime.bookedSeats / showtime.cinema.capacity) * 100;
              return (
                <tr key={showtime.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-8">
                        <img
                          className="h-12 w-8 rounded object-cover"
                          src={showtime.movie.poster}
                          alt={showtime.movie.title}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {showtime.movie.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {showtime.movie.duration} phút
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {showtime.cinema.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {showtime.cinema.screen}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center space-x-1 mb-1">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{new Date(showtime.date).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>{showtime.time}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {showtime.price.toLocaleString('vi-VN')}₫
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <span className={getOccupancyColor(occupancyRate)}>
                        {showtime.bookedSeats}/{showtime.cinema.capacity}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {occupancyRate.toFixed(1)}% lấp đầy
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(showtime.status)}`}>
                      {getStatusLabel(showtime.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleEditShowtime(showtime)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded"
                        title="Chỉnh sửa"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteShowtime(showtime.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded"
                        title="Xóa"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {editingShowtime ? 'Chỉnh sửa lịch chiếu' : 'Thêm lịch chiếu mới'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phim *
                  </label>
                  <select
                    value={formData.movie?.id || ''}
                    onChange={(e) => {
                      const movie = movieOptions.find(m => m.id === e.target.value);
                      setFormData({...formData, movie: movie as Movie});
                    }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Chọn phim</option>
                    {movieOptions.map(movie => (
                      <option key={movie.id} value={movie.id}>
                        {movie.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rạp *
                  </label>
                  <select
                    value={formData.cinema?.id || ''}
                    onChange={(e) => {
                      const cinema = cinemaOptions.find(c => c.value === e.target.value);
                      if (cinema && cinema.value !== 'all') {
                        setFormData({...formData, cinema: {
                          id: cinema.value,
                          name: cinema.label,
                          screen: 'Phòng 1',
                          capacity: 150
                        }});
                      }
                    }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Chọn rạp</option>
                    {cinemaOptions.slice(1).map(cinema => (
                      <option key={cinema.value} value={cinema.value}>
                        {cinema.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ngày chiếu *
                  </label>
                  <input
                    type="date"
                    value={formData.date || ''}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Giờ chiếu *
                  </label>
                  <input
                    type="time"
                    value={formData.time || ''}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Giá vé (₫) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={formData.price || ''}
                    onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Trạng thái *
                  </label>
                  <select
                    value={formData.status || ''}
                    onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Chọn trạng thái</option>
                    <option value="active">Đang bán</option>
                    <option value="cancelled">Đã hủy</option>
                    <option value="completed">Hoàn thành</option>
                  </select>
                </div>
              </div>
            </form>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveShowtime}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>{editingShowtime ? 'Cập nhật' : 'Thêm mới'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowtimesManagement;
