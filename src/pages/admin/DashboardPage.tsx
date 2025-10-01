import React from 'react';
import { 
  Users, Film, MapPin, Ticket, TrendingUp, TrendingDown,
  Calendar, DollarSign, Eye, Star, Clock, AlertCircle
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  const stats = [
    {
      name: 'Tổng người dùng',
      value: '12,847',
      change: '+12%',
      changeType: 'increase',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      name: 'Phim đang chiếu',
      value: '24',
      change: '+3',
      changeType: 'increase',
      icon: Film,
      color: 'bg-green-500'
    },
    {
      name: 'Rạp chiếu',
      value: '8',
      change: '+1',
      changeType: 'increase',
      icon: MapPin,
      color: 'bg-purple-500'
    },
    {
      name: 'Vé đã bán (tháng)',
      value: '3,247',
      change: '-5%',
      changeType: 'decrease',
      icon: Ticket,
      color: 'bg-orange-500'
    },
    {
      name: 'Doanh thu (tháng)',
      value: '₫2.4M',
      change: '+8%',
      changeType: 'increase',
      icon: DollarSign,
      color: 'bg-red-500'
    },
    {
      name: 'Đánh giá trung bình',
      value: '4.6',
      change: '+0.2',
      changeType: 'increase',
      icon: Star,
      color: 'bg-yellow-500'
    }
  ];

  const recentMovies = [
    {
      id: 1,
      title: 'Avatar: The Way of Water',
      status: 'Đang chiếu',
      revenue: '₫450,000',
      tickets: 125,
      rating: 4.8
    },
    {
      id: 2,
      title: 'Black Panther: Wakanda Forever',
      status: 'Đang chiếu',
      revenue: '₫380,000',
      tickets: 98,
      rating: 4.6
    },
    {
      id: 3,
      title: 'Top Gun: Maverick',
      status: 'Sắp chiếu',
      revenue: '₫0',
      tickets: 0,
      rating: 0
    }
  ];

  const recentBookings = [
    {
      id: 1,
      customer: 'Nguyễn Văn A',
      movie: 'Avatar: The Way of Water',
      cinema: 'CGV Vincom',
      time: '19:30',
      date: '2023-10-15',
      status: 'Đã thanh toán'
    },
    {
      id: 2,
      customer: 'Trần Thị B',
      movie: 'Black Panther',
      cinema: 'Lotte Landmark',
      time: '21:00',
      date: '2023-10-15',
      status: 'Chờ thanh toán'
    },
    {
      id: 3,
      customer: 'Lê Văn C',
      movie: 'Top Gun: Maverick',
      cinema: 'Galaxy Cinema',
      time: '16:45',
      date: '2023-10-16',
      status: 'Đã hủy'
    }
  ];

  const alerts = [
    {
      id: 1,
      type: 'warning',
      message: 'Rạp CGV Vincom có 2 máy chiếu cần bảo trì',
      time: '2 giờ trước'
    },
    {
      id: 2,
      type: 'info',
      message: 'Phim mới "Spider-Man: No Way Home" sẽ khởi chiếu vào 20/10',
      time: '4 giờ trước'
    },
    {
      id: 3,
      type: 'success',
      message: 'Doanh thu hôm nay đã đạt 95% mục tiêu',
      time: '6 giờ trước'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="mt-1 text-sm text-gray-600">
          Tổng quan hệ thống quản lý rạp chiếu phim
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`${stat.color} p-3 rounded-md`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stat.value}
                        </div>
                        <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                          stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.changeType === 'increase' ? (
                            <TrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                          ) : (
                            <TrendingDown className="self-center flex-shrink-0 h-4 w-4 text-red-500" />
                          )}
                          <span className="ml-1">{stat.change}</span>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Movies */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Phim gần đây
              </h3>
              <button className="text-sm text-blue-600 hover:text-blue-500">
                Xem tất cả
              </button>
            </div>
            <div className="space-y-4">
              {recentMovies.map((movie) => (
                <div key={movie.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{movie.title}</h4>
                    <div className="flex items-center mt-1 space-x-4 text-xs text-gray-500">
                      <span className={`px-2 py-1 rounded-full ${
                        movie.status === 'Đang chiếu' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {movie.status}
                      </span>
                      <span>{movie.tickets} vé</span>
                      {movie.rating > 0 && (
                        <span className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-400 mr-1" />
                          {movie.rating}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{movie.revenue}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Đặt vé gần đây
              </h3>
              <button className="text-sm text-blue-600 hover:text-blue-500">
                Xem tất cả
              </button>
            </div>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{booking.customer}</h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {booking.movie} • {booking.cinema}
                    </p>
                    <div className="flex items-center mt-1 space-x-2 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      <span>{booking.date}</span>
                      <Clock className="h-3 w-3" />
                      <span>{booking.time}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      booking.status === 'Đã thanh toán' ? 'bg-green-100 text-green-800' :
                      booking.status === 'Chờ thanh toán' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Thông báo hệ thống
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-500">
              Xem tất cả
            </button>
          </div>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className={`flex items-start p-4 rounded-lg ${
                alert.type === 'warning' ? 'bg-yellow-50 border-l-4 border-yellow-400' :
                alert.type === 'info' ? 'bg-blue-50 border-l-4 border-blue-400' :
                'bg-green-50 border-l-4 border-green-400'
              }`}>
                <div className="flex-shrink-0">
                  <AlertCircle className={`h-5 w-5 ${
                    alert.type === 'warning' ? 'text-yellow-400' :
                    alert.type === 'info' ? 'text-blue-400' :
                    'text-green-400'
                  }`} />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm text-gray-700">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Thao tác nhanh
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <button className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Film className="h-5 w-5 mr-2" />
              Thêm phim mới
            </button>
            <button className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Calendar className="h-5 w-5 mr-2" />
              Tạo lịch chiếu
            </button>
            <button className="flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Users className="h-5 w-5 mr-2" />
              Quản lý user
            </button>
            <button className="flex items-center justify-center px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
              <Eye className="h-5 w-5 mr-2" />
              Xem báo cáo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
