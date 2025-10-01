import React, { useState } from 'react';
import { 
  BarChart3, TrendingUp, TrendingDown, Users, Film, 
  DollarSign, Ticket, Calendar, Clock, Eye, Star
} from 'lucide-react';

const AnalyticsPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const periodOptions = [
    { value: 'week', label: '7 ngày qua' },
    { value: 'month', label: '30 ngày qua' },
    { value: 'quarter', label: '3 tháng qua' },
    { value: 'year', label: '12 tháng qua' }
  ];

  const revenueData = [
    { date: '01/10', revenue: 2500000, tickets: 125, customers: 98 },
    { date: '02/10', revenue: 3200000, tickets: 160, customers: 142 },
    { date: '03/10', revenue: 2800000, tickets: 140, customers: 115 },
    { date: '04/10', revenue: 4100000, tickets: 205, customers: 178 },
    { date: '05/10', revenue: 3600000, tickets: 180, customers: 156 },
    { date: '06/10', revenue: 2900000, tickets: 145, customers: 123 },
    { date: '07/10', revenue: 3800000, tickets: 190, customers: 167 }
  ];

  const topMovies = [
    {
      id: '1',
      title: 'Avatar: The Way of Water',
      revenue: 8500000,
      tickets: 425,
      rating: 4.8,
      growth: '+15%'
    },
    {
      id: '2',
      title: 'Black Panther: Wakanda Forever',
      revenue: 6200000,
      tickets: 310,
      rating: 4.6,
      growth: '+8%'
    },
    {
      id: '3',
      title: 'Top Gun: Maverick',
      revenue: 5800000,
      tickets: 290,
      rating: 4.9,
      growth: '+12%'
    },
    {
      id: '4',
      title: 'Spider-Man: No Way Home',
      revenue: 4900000,
      tickets: 245,
      rating: 4.7,
      growth: '-3%'
    }
  ];

  const cinemaPerformance = [
    {
      id: '1',
      name: 'CGV Vincom Center',
      revenue: 12500000,
      tickets: 625,
      occupancy: 78,
      growth: '+12%'
    },
    {
      id: '2',
      name: 'Lotte Cinema Landmark',
      revenue: 15200000,
      tickets: 760,
      occupancy: 85,
      growth: '+18%'
    },
    {
      id: '3',
      name: 'Galaxy Cinema Nguyễn Du',
      revenue: 8900000,
      tickets: 445,
      occupancy: 65,
      growth: '+5%'
    },
    {
      id: '4',
      name: 'BHD Star Cineplex',
      revenue: 11800000,
      tickets: 590,
      occupancy: 72,
      growth: '+9%'
    }
  ];

  const customerSegments = [
    { segment: 'Thành viên Platinum', count: 1250, revenue: 18500000, percentage: 35 },
    { segment: 'Thành viên Gold', count: 2800, revenue: 24200000, percentage: 28 },
    { segment: 'Thành viên Silver', count: 4200, revenue: 16800000, percentage: 22 },
    { segment: 'Thành viên Bronze', count: 6500, revenue: 12500000, percentage: 15 }
  ];

  const timeSlotAnalysis = [
    { time: '09:00-12:00', tickets: 850, revenue: 8500000, occupancy: 45 },
    { time: '12:00-15:00', tickets: 1200, revenue: 12000000, occupancy: 62 },
    { time: '15:00-18:00', tickets: 1850, revenue: 18500000, occupancy: 78 },
    { time: '18:00-21:00', tickets: 2400, revenue: 24000000, occupancy: 92 },
    { time: '21:00-24:00', tickets: 1650, revenue: 16500000, occupancy: 68 }
  ];

  const totalRevenue = revenueData.reduce((sum, day) => sum + day.revenue, 0);
  const totalTickets = revenueData.reduce((sum, day) => sum + day.tickets, 0);
  const avgTicketPrice = totalRevenue / totalTickets;

  const getGrowthColor = (growth: string) => {
    return growth.startsWith('+') ? 'text-green-600' : 'text-red-600';
  };

  const getGrowthIcon = (growth: string) => {
    return growth.startsWith('+') ? TrendingUp : TrendingDown;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Thống kê & Phân tích</h2>
          <p className="mt-1 text-sm text-gray-600">
            Phân tích hiệu suất kinh doanh và xu hướng khách hàng
          </p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {periodOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Tổng doanh thu</p>
              <p className="text-2xl font-bold text-gray-900">
                {totalRevenue.toLocaleString('vi-VN')}₫
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+12.5%</span>
              </div>
            </div>
            <DollarSign className="h-12 w-12 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Vé đã bán</p>
              <p className="text-2xl font-bold text-gray-900">{totalTickets.toLocaleString('vi-VN')}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+8.3%</span>
              </div>
            </div>
            <Ticket className="h-12 w-12 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Giá vé TB</p>
              <p className="text-2xl font-bold text-gray-900">
                {avgTicketPrice.toLocaleString('vi-VN')}₫
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+3.8%</span>
              </div>
            </div>
            <BarChart3 className="h-12 w-12 text-purple-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Tỷ lệ lấp đầy</p>
              <p className="text-2xl font-bold text-gray-900">74%</p>
              <div className="flex items-center mt-2">
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-sm text-red-600">-2.1%</span>
              </div>
            </div>
            <Users className="h-12 w-12 text-orange-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Doanh thu theo ngày</h3>
          <div className="space-y-4">
            {revenueData.map((day, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">{day.date}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">{day.tickets} vé</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {day.revenue.toLocaleString('vi-VN')}₫
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Movies */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Phim có doanh thu cao nhất</h3>
          <div className="space-y-4">
            {topMovies.map((movie, index) => (
              <div key={movie.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{movie.title}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>{movie.tickets} vé</span>
                      <span>•</span>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-400 mr-1" />
                        <span>{movie.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {movie.revenue.toLocaleString('vi-VN')}₫
                  </p>
                  <p className={`text-sm ${getGrowthColor(movie.growth)}`}>
                    {movie.growth}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cinema Performance */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hiệu suất theo rạp</h3>
          <div className="space-y-4">
            {cinemaPerformance.map((cinema) => (
              <div key={cinema.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">{cinema.name}</h4>
                  <span className={`text-sm ${getGrowthColor(cinema.growth)}`}>
                    {cinema.growth}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Doanh thu</p>
                    <p className="font-semibold">{cinema.revenue.toLocaleString('vi-VN')}₫</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Vé bán</p>
                    <p className="font-semibold">{cinema.tickets}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Lấp đầy</p>
                    <p className="font-semibold">{cinema.occupancy}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Segments */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Phân khúc khách hàng</h3>
          <div className="space-y-4">
            {customerSegments.map((segment, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{segment.segment}</span>
                  <span className="text-sm text-gray-500">{segment.count} người</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${segment.percentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{segment.percentage}%</span>
                  <span>{segment.revenue.toLocaleString('vi-VN')}₫</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Time Slot Analysis */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Phân tích theo khung giờ</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khung giờ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vé bán
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doanh thu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tỷ lệ lấp đầy
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {timeSlotAnalysis.map((slot, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">{slot.time}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {slot.tickets.toLocaleString('vi-VN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {slot.revenue.toLocaleString('vi-VN')}₫
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full ${
                            slot.occupancy >= 80 ? 'bg-green-500' :
                            slot.occupancy >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${slot.occupancy}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{slot.occupancy}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
