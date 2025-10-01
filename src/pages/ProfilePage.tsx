import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, Edit, Save, X, Star, Film, Gift, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    birthDate: '1990-01-01',
    gender: 'male',
    address: 'Hà Nội, Việt Nam'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Save profile logic here
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      birthDate: '1990-01-01',
      gender: 'male',
      address: 'Hà Nội, Việt Nam'
    });
    setIsEditing(false);
  };

  const stats = [
    { icon: Film, label: 'Phim đã xem', value: '12', color: 'text-blue-500' },
    { icon: Star, label: 'Yêu thích', value: '8', color: 'text-yellow-500' },
    { icon: Gift, label: 'Điểm tích lũy', value: '2,450', color: 'text-green-500' },
    { icon: Clock, label: 'Giờ xem', value: '24h', color: 'text-purple-500' }
  ];

  return (
    <div className="bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Thông tin cá nhân</h1>
          <p className="text-gray-400">Quản lý thông tin tài khoản của bạn</p>
        </div>

        {/* Profile Card */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-3xl">
                    {formData.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <button className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors">
                  <Edit className="h-4 w-4" />
                </button>
              </div>

              {/* User Info */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{formData.name}</h2>
                <p className="text-gray-400 mb-2">{formData.email}</p>
                <div className="flex items-center space-x-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">Thành viên VIP</span>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <div className="flex space-x-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Lưu
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Hủy
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Chỉnh sửa
                </button>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center p-4 bg-gray-700/30 rounded-xl">
                  <Icon className={`h-8 w-8 ${stat.color} mx-auto mb-2`} />
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <User className="h-4 w-4 inline mr-2" />
                Họ và tên
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <div className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600/50 rounded-lg text-white">
                  {formData.name}
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Mail className="h-4 w-4 inline mr-2" />
                Email
              </label>
              <div className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600/50 rounded-lg text-gray-400">
                {formData.email}
                <span className="text-xs ml-2">(Không thể thay đổi)</span>
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Phone className="h-4 w-4 inline mr-2" />
                Số điện thoại
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <div className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600/50 rounded-lg text-white">
                  {formData.phone || 'Chưa cập nhật'}
                </div>
              )}
            </div>

            {/* Birth Date */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Calendar className="h-4 w-4 inline mr-2" />
                Ngày sinh
              </label>
              {isEditing ? (
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <div className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600/50 rounded-lg text-white">
                  {new Date(formData.birthDate).toLocaleDateString('vi-VN')}
                </div>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Giới tính
              </label>
              {isEditing ? (
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
              ) : (
                <div className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600/50 rounded-lg text-white">
                  {formData.gender === 'male' ? 'Nam' : formData.gender === 'female' ? 'Nữ' : 'Khác'}
                </div>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Địa chỉ
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <div className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600/50 rounded-lg text-white">
                  {formData.address}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-white mb-6">Bảo mật tài khoản</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
              <div>
                <h4 className="text-white font-medium">Đổi mật khẩu</h4>
                <p className="text-gray-400 text-sm">Cập nhật mật khẩu để bảo mật tài khoản</p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                Đổi mật khẩu
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
              <div>
                <h4 className="text-white font-medium">Xác thực 2 bước</h4>
                <p className="text-gray-400 text-sm">Tăng cường bảo mật với xác thực 2 bước</p>
              </div>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                Kích hoạt
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
