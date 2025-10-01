import React, { useState } from 'react';
import { 
  Plus, Search, Filter, Edit, Trash2, MapPin, Phone,
  Clock, Users, Monitor, Wifi, Car, Save, X, Star
} from 'lucide-react';

interface Cinema {
  id: string;
  name: string;
  address: string;
  district: string;
  phone: string;
  email: string;
  manager: string;
  screens: number;
  totalSeats: number;
  openTime: string;
  closeTime: string;
  facilities: string[];
  status: 'active' | 'maintenance' | 'closed';
  rating: number;
  image: string;
  coordinates: { lat: number; lng: number };
}

const CinemasManagement: React.FC = () => {
  const [cinemas, setCinemas] = useState<Cinema[]>([
    {
      id: '1',
      name: 'CGV Vincom Center',
      address: '70-72 Lê Thánh Tôn, Quận 1',
      district: 'Quận 1',
      phone: '1900 6017',
      email: 'vincom@cgv.vn',
      manager: 'Nguyễn Văn A',
      screens: 8,
      totalSeats: 1200,
      openTime: '09:00',
      closeTime: '23:00',
      facilities: ['parking', 'wifi', 'food', 'shopping', 'accessible'],
      status: 'active',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1489599735734-79b4169c2a78?w=500',
      coordinates: { lat: 10.7769, lng: 106.7009 }
    },
    {
      id: '2',
      name: 'Lotte Cinema Landmark',
      address: '720A Điện Biên Phủ, Quận 1',
      district: 'Quận 1',
      phone: '1900 5555',
      email: 'landmark@lotte.vn',
      manager: 'Trần Thị B',
      screens: 12,
      totalSeats: 1800,
      openTime: '08:30',
      closeTime: '23:30',
      facilities: ['parking', 'wifi', 'food', 'shopping'],
      status: 'active',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500',
      coordinates: { lat: 10.7967, lng: 106.7197 }
    },
    {
      id: '3',
      name: 'Galaxy Cinema Nguyễn Du',
      address: '116 Nguyễn Du, Quận 1',
      district: 'Quận 1',
      phone: '1900 2224',
      email: 'nguyendu@galaxy.vn',
      manager: 'Lê Văn C',
      screens: 6,
      totalSeats: 900,
      openTime: '09:30',
      closeTime: '22:30',
      facilities: ['wifi', 'food', 'accessible'],
      status: 'maintenance',
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500',
      coordinates: { lat: 10.7756, lng: 106.6934 }
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingCinema, setEditingCinema] = useState<Cinema | null>(null);
  const [formData, setFormData] = useState<Partial<Cinema>>({});

  const districts = ['all', 'Quận 1', 'Quận 3', 'Quận 7', 'Quận Bình Thạnh', 'Quận Tân Bình'];
  const statusOptions = [
    { value: 'all', label: 'Tất cả' },
    { value: 'active', label: 'Hoạt động' },
    { value: 'maintenance', label: 'Bảo trì' },
    { value: 'closed', label: 'Đóng cửa' }
  ];

  const facilityOptions = [
    { value: 'parking', label: 'Bãi đỗ xe', icon: Car },
    { value: 'wifi', label: 'WiFi miễn phí', icon: Wifi },
    { value: 'food', label: 'Đồ ăn & thức uống', icon: Users },
    { value: 'shopping', label: 'Khu mua sắm', icon: Users },
    { value: 'accessible', label: 'Tiện ích khuyết tật', icon: Users }
  ];

  const filteredCinemas = cinemas.filter(cinema => {
    const matchesSearch = cinema.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cinema.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistrict = selectedDistrict === 'all' || cinema.district === selectedDistrict;
    const matchesStatus = selectedStatus === 'all' || cinema.status === selectedStatus;
    return matchesSearch && matchesDistrict && matchesStatus;
  });

  const handleAddCinema = () => {
    setEditingCinema(null);
    setFormData({
      name: '',
      address: '',
      district: '',
      phone: '',
      email: '',
      manager: '',
      screens: 0,
      totalSeats: 0,
      openTime: '09:00',
      closeTime: '23:00',
      facilities: [],
      status: 'active',
      rating: 0,
      image: '',
      coordinates: { lat: 0, lng: 0 }
    });
    setShowModal(true);
  };

  const handleEditCinema = (cinema: Cinema) => {
    setEditingCinema(cinema);
    setFormData(cinema);
    setShowModal(true);
  };

  const handleDeleteCinema = (cinemaId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa rạp chiếu này?')) {
      setCinemas(cinemas.filter(cinema => cinema.id !== cinemaId));
    }
  };

  const handleSaveCinema = () => {
    if (editingCinema) {
      setCinemas(cinemas.map(cinema => 
        cinema.id === editingCinema.id ? { ...cinema, ...formData } : cinema
      ));
    } else {
      const newCinema: Cinema = {
        ...formData as Cinema,
        id: Date.now().toString()
      };
      setCinemas([...cinemas, newCinema]);
    }
    setShowModal(false);
    setFormData({});
  };

  const handleFacilityToggle = (facility: string) => {
    const currentFacilities = formData.facilities || [];
    const updatedFacilities = currentFacilities.includes(facility)
      ? currentFacilities.filter(f => f !== facility)
      : [...currentFacilities, facility];
    setFormData({ ...formData, facilities: updatedFacilities });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Hoạt động';
      case 'maintenance': return 'Bảo trì';
      case 'closed': return 'Đóng cửa';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quản lý rạp chiếu</h2>
          <p className="mt-1 text-sm text-gray-600">
            Quản lý thông tin rạp chiếu và cơ sở vật chất
          </p>
        </div>
        <button
          onClick={handleAddCinema}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Thêm rạp mới</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <MapPin className="h-8 w-8 text-blue-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Tổng rạp</p>
              <p className="text-2xl font-semibold text-gray-900">{cinemas.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Monitor className="h-8 w-8 text-green-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Tổng phòng chiếu</p>
              <p className="text-2xl font-semibold text-gray-900">
                {cinemas.reduce((sum, cinema) => sum + cinema.screens, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Tổng ghế ngồi</p>
              <p className="text-2xl font-semibold text-gray-900">
                {cinemas.reduce((sum, cinema) => sum + cinema.totalSeats, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Star className="h-8 w-8 text-yellow-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Đánh giá TB</p>
              <p className="text-2xl font-semibold text-gray-900">
                {(cinemas.reduce((sum, cinema) => sum + cinema.rating, 0) / cinemas.length).toFixed(1)}
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
                placeholder="Tìm kiếm rạp chiếu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {districts.map(district => (
                <option key={district} value={district}>
                  {district === 'all' ? 'Tất cả quận' : district}
                </option>
              ))}
            </select>
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
          </div>
        </div>
      </div>

      {/* Cinemas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCinemas.map((cinema) => (
          <div key={cinema.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="relative h-48 overflow-hidden rounded-t-lg">
              <img
                src={cinema.image}
                alt={cinema.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(cinema.status)}`}>
                  {getStatusLabel(cinema.status)}
                </span>
              </div>
              <div className="absolute bottom-4 left-4">
                <div className="flex items-center bg-black bg-opacity-70 text-white px-2 py-1 rounded">
                  <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm">{cinema.rating}</span>
                </div>
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{cinema.name}</h3>
              
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{cinema.address}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{cinema.phone}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{cinema.openTime} - {cinema.closeTime}</span>
                </div>
                <div className="flex items-center">
                  <Monitor className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{cinema.screens} phòng chiếu • {cinema.totalSeats} ghế</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  QL: {cinema.manager}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditCinema(cinema)}
                    className="text-blue-600 hover:text-blue-800 p-1 rounded"
                    title="Chỉnh sửa"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCinema(cinema.id)}
                    className="text-red-600 hover:text-red-800 p-1 rounded"
                    title="Xóa"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {editingCinema ? 'Chỉnh sửa rạp chiếu' : 'Thêm rạp chiếu mới'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên rạp *
                  </label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quận *
                  </label>
                  <select
                    value={formData.district || ''}
                    onChange={(e) => setFormData({...formData, district: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Chọn quận</option>
                    {districts.slice(1).map(district => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Địa chỉ *
                  </label>
                  <input
                    type="text"
                    value={formData.address || ''}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quản lý *
                  </label>
                  <input
                    type="text"
                    value={formData.manager || ''}
                    onChange={(e) => setFormData({...formData, manager: e.target.value})}
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
                    <option value="active">Hoạt động</option>
                    <option value="maintenance">Bảo trì</option>
                    <option value="closed">Đóng cửa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số phòng chiếu *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.screens || ''}
                    onChange={(e) => setFormData({...formData, screens: parseInt(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tổng số ghế *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.totalSeats || ''}
                    onChange={(e) => setFormData({...formData, totalSeats: parseInt(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Giờ mở cửa *
                  </label>
                  <input
                    type="time"
                    value={formData.openTime || ''}
                    onChange={(e) => setFormData({...formData, openTime: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Giờ đóng cửa *
                  </label>
                  <input
                    type="time"
                    value={formData.closeTime || ''}
                    onChange={(e) => setFormData({...formData, closeTime: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Đánh giá
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating || ''}
                    onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL Hình ảnh
                  </label>
                  <input
                    type="url"
                    value={formData.image || ''}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Facilities */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Tiện ích
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {facilityOptions.map((facility) => (
                    <label key={facility.value} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(formData.facilities || []).includes(facility.value)}
                        onChange={() => handleFacilityToggle(facility.value)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{facility.label}</span>
                    </label>
                  ))}
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
                onClick={handleSaveCinema}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>{editingCinema ? 'Cập nhật' : 'Thêm mới'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CinemasManagement;
