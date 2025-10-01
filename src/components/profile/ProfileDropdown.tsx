import React, { useState } from 'react';
import { User, Settings, Heart, Clock, LogOut, ChevronDown, Star, Film, Gift } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfileDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    navigate('/');
  };

  const menuItems = [
    {
      icon: <User className="h-4 w-4" />,
      label: 'Thông tin cá nhân',
      onClick: () => navigate('/profile')
    },
    {
      icon: <Film className="h-4 w-4" />,
      label: 'Lịch sử đặt vé',
      onClick: () => navigate('/booking-history')
    },
    {
      icon: <Heart className="h-4 w-4" />,
      label: 'Phim yêu thích',
      onClick: () => navigate('/favorites')
    },
    {
      icon: <Gift className="h-4 w-4" />,
      label: 'Ưu đãi của tôi',
      onClick: () => navigate('/promotions')
    },
    {
      icon: <Settings className="h-4 w-4" />,
      label: 'Cài đặt',
      onClick: () => navigate('/settings')
    }
  ];

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/login')}
          className="text-gray-300 hover:text-white transition-colors"
        >
          Đăng nhập
        </button>
        <button
          onClick={() => navigate('/register')}
          className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300"
        >
          Đăng ký
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold text-sm">
            {user.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="hidden md:block text-left">
          <p className="text-white font-medium text-sm">{user.name}</p>
          <p className="text-gray-400 text-xs">Thành viên VIP</p>
        </div>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${
          isOpen ? 'rotate-180' : ''
        }`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-gray-800 border border-gray-700 rounded-xl shadow-xl z-50">
          {/* User Info Header */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold">{user.name}</h3>
                <p className="text-gray-400 text-sm">{user.email}</p>
                <div className="flex items-center mt-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400 ml-2">Thành viên VIP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="p-4 border-b border-gray-700">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-white font-semibold">12</p>
                <p className="text-gray-400 text-xs">Phim đã xem</p>
              </div>
              <div>
                <p className="text-white font-semibold">8</p>
                <p className="text-gray-400 text-xs">Yêu thích</p>
              </div>
              <div>
                <p className="text-white font-semibold">2,450</p>
                <p className="text-gray-400 text-xs">Điểm tích lũy</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Logout */}
          <div className="border-t border-gray-700 p-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-gray-700/50 transition-colors rounded-lg"
            >
              <LogOut className="h-4 w-4" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
