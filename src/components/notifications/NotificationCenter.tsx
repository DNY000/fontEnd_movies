import React, { useState } from 'react';
import { Bell, X, Check, Clock, Gift, Film, AlertCircle } from 'lucide-react';

interface Notification {
  id: string;
  type: 'booking' | 'promotion' | 'news' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon?: React.ReactNode;
}

const NotificationCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'booking',
      title: 'Đặt vé thành công',
      message: 'Bạn đã đặt vé xem phim Avatar: The Way of Water thành công. Suất chiếu 19:30 ngày 15/10.',
      time: '5 phút trước',
      read: false,
      icon: <Film className="h-5 w-5 text-green-500" />
    },
    {
      id: '2',
      type: 'promotion',
      title: 'Khuyến mãi đặc biệt',
      message: 'Giảm 50% cho vé xem phim vào thứ 3 hàng tuần. Áp dụng từ 16/10 - 30/10.',
      time: '1 giờ trước',
      read: false,
      icon: <Gift className="h-5 w-5 text-red-500" />
    },
    {
      id: '3',
      type: 'news',
      title: 'Phim mới ra mắt',
      message: 'Black Panther: Wakanda Forever chính thức khởi chiếu từ 20/10. Đặt vé ngay!',
      time: '2 giờ trước',
      read: true,
      icon: <Film className="h-5 w-5 text-blue-500" />
    },
    {
      id: '4',
      type: 'system',
      title: 'Bảo trì hệ thống',
      message: 'Hệ thống sẽ bảo trì từ 2:00 - 4:00 sáng ngày 16/10. Vui lòng sắp xếp thời gian phù hợp.',
      time: '1 ngày trước',
      read: true,
      icon: <AlertCircle className="h-5 w-5 text-yellow-500" />
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'booking': return 'border-green-500/20 bg-green-500/10';
      case 'promotion': return 'border-red-500/20 bg-red-500/10';
      case 'news': return 'border-blue-500/20 bg-blue-500/10';
      case 'system': return 'border-yellow-500/20 bg-yellow-500/10';
      default: return 'border-gray-500/20 bg-gray-500/10';
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-400 hover:text-white transition-colors"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-gray-800 border border-gray-700 rounded-xl shadow-xl z-50 max-h-96 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h3 className="text-white font-semibold">Thông báo</h3>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Đánh dấu tất cả đã đọc
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Không có thông báo nào</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors ${
                    !notification.read ? 'bg-gray-700/20' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {/* Icon */}
                    <div className={`p-2 rounded-lg ${getTypeColor(notification.type)}`}>
                      {notification.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className={`font-medium ${
                          notification.read ? 'text-gray-300' : 'text-white'
                        }`}>
                          {notification.title}
                        </h4>
                        <div className="flex items-center space-x-1 ml-2">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-blue-400 hover:text-blue-300 transition-colors"
                              title="Đánh dấu đã đọc"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="text-gray-400 hover:text-red-400 transition-colors"
                            title="Xóa thông báo"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      <p className={`text-sm mt-1 ${
                        notification.read ? 'text-gray-400' : 'text-gray-300'
                      }`}>
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {notification.time}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-4 border-t border-gray-700 text-center">
              <button className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                Xem tất cả thông báo
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
