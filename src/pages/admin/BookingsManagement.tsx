import React, { useState } from 'react';
import { 
  Search, Filter, Eye, Download, RefreshCw, Calendar,
  Clock, MapPin, Users, DollarSign, Ticket, CheckCircle,
  XCircle, AlertCircle, User, Film
} from 'lucide-react';

interface Booking {
  id: string;
  bookingCode: string;
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  movie: {
    id: string;
    title: string;
    poster: string;
  };
  cinema: {
    id: string;
    name: string;
    address: string;
  };
  showtime: {
    date: string;
    time: string;
    screen: string;
  };
  seats: string[];
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  bookingStatus: 'confirmed' | 'cancelled' | 'completed' | 'no_show';
  bookingDate: string;
  notes?: string;
}

const BookingsManagement: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: '1',
      bookingCode: 'BK001234',
      customer: {
        id: '1',
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@gmail.com',
        phone: '0901234567'
      },
      movie: {
        id: '1',
        title: 'Avatar: The Way of Water',
        poster: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg'
      },
      cinema: {
        id: '1',
        name: 'CGV Vincom Center',
        address: '70-72 Lê Thánh Tôn, Quận 1'
      },
      showtime: {
        date: '2023-10-20',
        time: '19:30',
        screen: 'Phòng 1'
      },
      seats: ['A1', 'A2'],
      totalAmount: 200000,
      paymentMethod: 'Thẻ tín dụng',
      paymentStatus: 'paid',
      bookingStatus: 'confirmed',
      bookingDate: '2023-10-15T14:30:00'
    },
    {
      id: '2',
      bookingCode: 'BK001235',
      customer: {
        id: '2',
        name: 'Trần Thị B',
        email: 'tranthib@gmail.com',
        phone: '0907654321'
      },
      movie: {
        id: '2',
        title: 'Black Panther: Wakanda Forever',
        poster: 'https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg'
      },
      cinema: {
        id: '2',
        name: 'Lotte Cinema Landmark',
        address: '720A Điện Biên Phủ, Quận 1'
      },
      showtime: {
        date: '2023-10-18',
        time: '21:00',
        screen: 'Phòng 3'
      },
      seats: ['B5', 'B6', 'B7'],
      totalAmount: 300000,
      paymentMethod: 'Ví điện tử',
      paymentStatus: 'pending',
      bookingStatus: 'confirmed',
      bookingDate: '2023-10-14T16:45:00'
    },
    {
      id: '3',
      bookingCode: 'BK001236',
      customer: {
        id: '3',
        name: 'Lê Văn C',
        email: 'levanc@gmail.com',
        phone: '0912345678'
      },
      movie: {
        id: '1',
        title: 'Avatar: The Way of Water',
        poster: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg'
      },
      cinema: {
        id: '1',
        name: 'CGV Vincom Center',
        address: '70-72 Lê Thánh Tôn, Quận 1'
      },
      showtime: {
        date: '2023-10-16',
        time: '16:30',
        screen: 'Phòng 2'
      },
      seats: ['C10'],
      totalAmount: 100000,
      paymentMethod: 'Tiền mặt',
      paymentStatus: 'paid',
      bookingStatus: 'completed',
      bookingDate: '2023-10-12T10:20:00'
    },
    {
      id: '4',
      bookingCode: 'BK001237',
      customer: {
        id: '4',
        name: 'Phạm Thị D',
        email: 'phamthid@gmail.com',
        phone: '0908765432'
      },
      movie: {
        id: '3',
        title: 'Top Gun: Maverick',
        poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500'
      },
      cinema: {
        id: '3',
        name: 'Galaxy Cinema Nguyễn Du',
        address: '116 Nguyễn Du, Quận 1'
      },
      showtime: {
        date: '2023-10-19',
        time: '14:00',
        screen: 'Phòng 1'
      },
      seats: ['D8', 'D9'],
      totalAmount: 180000,
      paymentMethod: 'Chuyển khoản',
      paymentStatus: 'failed',
      bookingStatus: 'cancelled',
      bookingDate: '2023-10-13T09:15:00',
      notes: 'Khách hàng hủy do có việc đột xuất'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState('all');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const statusOptions = [
    { value: 'all', label: 'Tất cả trạng thái' },
    { value: 'confirmed', label: 'Đã xác nhận' },
    { value: 'cancelled', label: 'Đã hủy' },
    { value: 'completed', label: 'Hoàn thành' },
    { value: 'no_show', label: 'Không đến' }
  ];

  const paymentStatusOptions = [
    { value: 'all', label: 'Tất cả thanh toán' },
    { value: 'pending', label: 'Chờ thanh toán' },
    { value: 'paid', label: 'Đã thanh toán' },
    { value: 'failed', label: 'Thanh toán thất bại' },
    { value: 'refunded', label: 'Đã hoàn tiền' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'Tất cả thời gian' },
    { value: 'today', label: 'Hôm nay' },
    { value: 'week', label: '7 ngày qua' },
    { value: 'month', label: '30 ngày qua' }
  ];

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.bookingCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || booking.bookingStatus === selectedStatus;
    const matchesPaymentStatus = selectedPaymentStatus === 'all' || booking.paymentStatus === selectedPaymentStatus;
    return matchesSearch && matchesStatus && matchesPaymentStatus;
  });

  const handleViewDetail = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowDetailModal(true);
  };

  const handleUpdateStatus = (bookingId: string, newStatus: string) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, bookingStatus: newStatus as any }
        : booking
    ));
  };

  const handleRefund = (bookingId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn hoàn tiền cho đặt vé này?')) {
      setBookings(bookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, paymentStatus: 'refunded', bookingStatus: 'cancelled' }
          : booking
      ));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'no_show': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Đã xác nhận';
      case 'cancelled': return 'Đã hủy';
      case 'completed': return 'Hoàn thành';
      case 'no_show': return 'Không đến';
      default: return status;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusLabel = (status: string) => {
    switch (status) {
      case 'paid': return 'Đã thanh toán';
      case 'pending': return 'Chờ thanh toán';
      case 'failed': return 'Thất bại';
      case 'refunded': return 'Đã hoàn tiền';
      default: return status;
    }
  };

  const getTotalRevenue = () => {
    return bookings
      .filter(b => b.paymentStatus === 'paid')
      .reduce((sum, booking) => sum + booking.totalAmount, 0);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quản lý đặt vé</h2>
          <p className="mt-1 text-sm text-gray-600">
            Theo dõi và quản lý tất cả đặt vé trong hệ thống
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Download className="h-4 w-4" />
            <span>Xuất báo cáo</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <RefreshCw className="h-4 w-4" />
            <span>Làm mới</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Ticket className="h-8 w-8 text-blue-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Tổng đặt vé</p>
              <p className="text-2xl font-semibold text-gray-900">{bookings.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Đã xác nhận</p>
              <p className="text-2xl font-semibold text-gray-900">
                {bookings.filter(b => b.bookingStatus === 'confirmed').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-purple-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Doanh thu</p>
              <p className="text-2xl font-semibold text-gray-900">
                {getTotalRevenue().toLocaleString('vi-VN')}₫
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <XCircle className="h-8 w-8 text-red-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Đã hủy</p>
              <p className="text-2xl font-semibold text-gray-900">
                {bookings.filter(b => b.bookingStatus === 'cancelled').length}
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
                placeholder="Tìm kiếm theo mã đặt vé, tên khách hàng, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              value={selectedPaymentStatus}
              onChange={(e) => setSelectedPaymentStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {paymentStatusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Đặt vé
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Khách hàng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phim & Rạp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lịch chiếu
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thanh toán
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
            {filteredBookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {booking.bookingCode}
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDateTime(booking.bookingDate)}
                    </div>
                    <div className="text-xs text-gray-400">
                      {booking.seats.length} ghế: {booking.seats.join(', ')}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8">
                      <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {booking.customer.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.customer.email}
                      </div>
                      <div className="text-xs text-gray-400">
                        {booking.customer.phone}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-8">
                      <img
                        className="h-12 w-8 rounded object-cover"
                        src={booking.movie.poster}
                        alt={booking.movie.title}
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {booking.movie.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.cinema.name}
                      </div>
                      <div className="text-xs text-gray-400">
                        {booking.showtime.screen}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center space-x-1 mb-1">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>{formatDate(booking.showtime.date)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>{booking.showtime.time}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 mb-1">
                    {booking.totalAmount.toLocaleString('vi-VN')}₫
                  </div>
                  <div className="text-xs text-gray-500 mb-1">
                    {booking.paymentMethod}
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(booking.paymentStatus)}`}>
                    {getPaymentStatusLabel(booking.paymentStatus)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.bookingStatus)}`}>
                    {getStatusLabel(booking.bookingStatus)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => handleViewDetail(booking)}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded"
                      title="Xem chi tiết"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    {booking.paymentStatus === 'paid' && booking.bookingStatus !== 'cancelled' && (
                      <button
                        onClick={() => handleRefund(booking.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded"
                        title="Hoàn tiền"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedBooking && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-3xl shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                Chi tiết đặt vé - {selectedBooking.bookingCode}
              </h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-md font-semibold text-gray-900 mb-3">Thông tin khách hàng</h4>
                <div className="space-y-2 text-sm">
                  <div><strong>Tên:</strong> {selectedBooking.customer.name}</div>
                  <div><strong>Email:</strong> {selectedBooking.customer.email}</div>
                  <div><strong>Điện thoại:</strong> {selectedBooking.customer.phone}</div>
                </div>
              </div>

              {/* Movie Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-md font-semibold text-gray-900 mb-3">Thông tin phim</h4>
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedBooking.movie.poster}
                    alt={selectedBooking.movie.title}
                    className="w-16 h-20 object-cover rounded"
                  />
                  <div className="text-sm">
                    <div><strong>Phim:</strong> {selectedBooking.movie.title}</div>
                    <div><strong>Rạp:</strong> {selectedBooking.cinema.name}</div>
                    <div><strong>Địa chỉ:</strong> {selectedBooking.cinema.address}</div>
                  </div>
                </div>
              </div>

              {/* Showtime Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-md font-semibold text-gray-900 mb-3">Lịch chiếu</h4>
                <div className="space-y-2 text-sm">
                  <div><strong>Ngày:</strong> {formatDate(selectedBooking.showtime.date)}</div>
                  <div><strong>Giờ:</strong> {selectedBooking.showtime.time}</div>
                  <div><strong>Phòng:</strong> {selectedBooking.showtime.screen}</div>
                  <div><strong>Ghế:</strong> {selectedBooking.seats.join(', ')}</div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-md font-semibold text-gray-900 mb-3">Thanh toán</h4>
                <div className="space-y-2 text-sm">
                  <div><strong>Tổng tiền:</strong> {selectedBooking.totalAmount.toLocaleString('vi-VN')}₫</div>
                  <div><strong>Phương thức:</strong> {selectedBooking.paymentMethod}</div>
                  <div>
                    <strong>Trạng thái:</strong> 
                    <span className={`ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(selectedBooking.paymentStatus)}`}>
                      {getPaymentStatusLabel(selectedBooking.paymentStatus)}
                    </span>
                  </div>
                  <div>
                    <strong>Đặt vé:</strong> 
                    <span className={`ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedBooking.bookingStatus)}`}>
                      {getStatusLabel(selectedBooking.bookingStatus)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {selectedBooking.notes && (
              <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
                <h4 className="text-md font-semibold text-gray-900 mb-2">Ghi chú</h4>
                <p className="text-sm text-gray-700">{selectedBooking.notes}</p>
              </div>
            )}

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Đóng
              </button>
              {selectedBooking.paymentStatus === 'paid' && selectedBooking.bookingStatus !== 'cancelled' && (
                <button
                  onClick={() => {
                    handleRefund(selectedBooking.id);
                    setShowDetailModal(false);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  Hoàn tiền
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsManagement;
