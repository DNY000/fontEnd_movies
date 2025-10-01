import React, { useState } from 'react';
import { 
  User, Bell, Shield, Eye, Globe, Smartphone, Mail, 
  Lock, Key, Trash2, Download, Upload, Moon, Sun,
  Volume2, VolumeX, Wifi, WifiOff, Save, X
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    // Profile Settings
    language: 'vi',
    timezone: 'Asia/Ho_Chi_Minh',
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    promotionNotifications: true,
    bookingReminders: true,
    
    // Privacy Settings
    profileVisibility: 'public',
    showWatchHistory: true,
    allowDataCollection: false,
    
    // Display Settings
    theme: 'dark',
    autoPlay: true,
    soundEffects: true,
    highQuality: true,
    
    // Security Settings
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: 30
  });

  const [isChanged, setIsChanged] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Hồ sơ', icon: User },
    { id: 'notifications', label: 'Thông báo', icon: Bell },
    { id: 'privacy', label: 'Riêng tư', icon: Shield },
    { id: 'display', label: 'Hiển thị', icon: Eye },
    { id: 'security', label: 'Bảo mật', icon: Lock }
  ];

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    setIsChanged(true);
  };

  const handleSave = () => {
    // Save settings logic
    console.log('Saving settings:', settings);
    setIsChanged(false);
  };

  const handleReset = () => {
    // Reset to default settings
    setIsChanged(false);
  };

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Cài đặt hồ sơ</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Globe className="h-4 w-4 inline mr-2" />
              Ngôn ngữ
            </label>
            <select
              value={settings.language}
              onChange={(e) => handleSettingChange('language', e.target.value)}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="vi">Tiếng Việt</option>
              <option value="en">English</option>
              <option value="zh">中文</option>
              <option value="ja">日本語</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Múi giờ
            </label>
            <select
              value={settings.timezone}
              onChange={(e) => handleSettingChange('timezone', e.target.value)}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="Asia/Ho_Chi_Minh">Việt Nam (GMT+7)</option>
              <option value="Asia/Bangkok">Bangkok (GMT+7)</option>
              <option value="Asia/Singapore">Singapore (GMT+8)</option>
              <option value="Asia/Tokyo">Tokyo (GMT+9)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 pt-6">
        <h4 className="text-md font-medium text-white mb-4">Quản lý dữ liệu</h4>
        <div className="space-y-3">
          <button className="flex items-center w-full p-4 bg-gray-700/30 hover:bg-gray-600/30 rounded-lg transition-colors">
            <Download className="h-5 w-5 text-blue-400 mr-3" />
            <div className="text-left">
              <p className="text-white font-medium">Tải xuống dữ liệu</p>
              <p className="text-gray-400 text-sm">Tải về tất cả dữ liệu cá nhân</p>
            </div>
          </button>
          
          <button className="flex items-center w-full p-4 bg-gray-700/30 hover:bg-gray-600/30 rounded-lg transition-colors">
            <Trash2 className="h-5 w-5 text-red-400 mr-3" />
            <div className="text-left">
              <p className="text-white font-medium">Xóa tài khoản</p>
              <p className="text-gray-400 text-sm">Xóa vĩnh viễn tài khoản và dữ liệu</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Cài đặt thông báo</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-blue-400 mr-3" />
              <div>
                <p className="text-white font-medium">Thông báo email</p>
                <p className="text-gray-400 text-sm">Nhận thông báo qua email</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
            <div className="flex items-center">
              <Smartphone className="h-5 w-5 text-green-400 mr-3" />
              <div>
                <p className="text-white font-medium">Thông báo đẩy</p>
                <p className="text-gray-400 text-sm">Nhận thông báo trên thiết bị</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
            <div className="flex items-center">
              <Bell className="h-5 w-5 text-yellow-400 mr-3" />
              <div>
                <p className="text-white font-medium">Nhắc nhở đặt vé</p>
                <p className="text-gray-400 text-sm">Nhắc nhở trước giờ chiếu</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.bookingReminders}
                onChange={(e) => handleSettingChange('bookingReminders', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Cài đặt riêng tư</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Hiển thị hồ sơ
            </label>
            <select
              value={settings.profileVisibility}
              onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="public">Công khai</option>
              <option value="friends">Chỉ bạn bè</option>
              <option value="private">Riêng tư</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
            <div>
              <p className="text-white font-medium">Hiển thị lịch sử xem</p>
              <p className="text-gray-400 text-sm">Cho phép người khác xem phim bạn đã xem</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.showWatchHistory}
                onChange={(e) => handleSettingChange('showWatchHistory', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
            <div>
              <p className="text-white font-medium">Thu thập dữ liệu</p>
              <p className="text-gray-400 text-sm">Cho phép thu thập dữ liệu để cải thiện dịch vụ</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.allowDataCollection}
                onChange={(e) => handleSettingChange('allowDataCollection', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDisplaySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Cài đặt hiển thị</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Giao diện
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleSettingChange('theme', 'dark')}
                className={`flex items-center justify-center p-4 rounded-lg border-2 transition-colors ${
                  settings.theme === 'dark'
                    ? 'border-red-500 bg-red-500/20'
                    : 'border-gray-600 bg-gray-700/30 hover:border-gray-500'
                }`}
              >
                <Moon className="h-6 w-6 text-white mr-2" />
                <span className="text-white">Tối</span>
              </button>
              <button
                onClick={() => handleSettingChange('theme', 'light')}
                className={`flex items-center justify-center p-4 rounded-lg border-2 transition-colors ${
                  settings.theme === 'light'
                    ? 'border-red-500 bg-red-500/20'
                    : 'border-gray-600 bg-gray-700/30 hover:border-gray-500'
                }`}
              >
                <Sun className="h-6 w-6 text-white mr-2" />
                <span className="text-white">Sáng</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
            <div className="flex items-center">
              <Volume2 className="h-5 w-5 text-purple-400 mr-3" />
              <div>
                <p className="text-white font-medium">Hiệu ứng âm thanh</p>
                <p className="text-gray-400 text-sm">Phát âm thanh khi tương tác</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.soundEffects}
                onChange={(e) => handleSettingChange('soundEffects', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
            <div className="flex items-center">
              <Wifi className="h-5 w-5 text-green-400 mr-3" />
              <div>
                <p className="text-white font-medium">Chất lượng cao</p>
                <p className="text-gray-400 text-sm">Tự động tải hình ảnh chất lượng cao</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.highQuality}
                onChange={(e) => handleSettingChange('highQuality', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Cài đặt bảo mật</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
            <div className="flex items-center">
              <Key className="h-5 w-5 text-blue-400 mr-3" />
              <div>
                <p className="text-white font-medium">Xác thực 2 bước</p>
                <p className="text-gray-400 text-sm">Tăng cường bảo mật tài khoản</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.twoFactorAuth}
                onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
            <div className="flex items-center">
              <Bell className="h-5 w-5 text-yellow-400 mr-3" />
              <div>
                <p className="text-white font-medium">Cảnh báo đăng nhập</p>
                <p className="text-gray-400 text-sm">Thông báo khi có đăng nhập mới</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.loginAlerts}
                onChange={(e) => handleSettingChange('loginAlerts', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Thời gian hết phiên (phút)
            </label>
            <select
              value={settings.sessionTimeout}
              onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value={15}>15 phút</option>
              <option value={30}>30 phút</option>
              <option value={60}>1 giờ</option>
              <option value={120}>2 giờ</option>
              <option value={0}>Không giới hạn</option>
            </select>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 pt-6">
        <h4 className="text-md font-medium text-white mb-4">Quản lý bảo mật</h4>
        <div className="space-y-3">
          <button className="flex items-center w-full p-4 bg-gray-700/30 hover:bg-gray-600/30 rounded-lg transition-colors">
            <Lock className="h-5 w-5 text-blue-400 mr-3" />
            <div className="text-left">
              <p className="text-white font-medium">Đổi mật khẩu</p>
              <p className="text-gray-400 text-sm">Cập nhật mật khẩu bảo mật</p>
            </div>
          </button>
          
          <button className="flex items-center w-full p-4 bg-gray-700/30 hover:bg-gray-600/30 rounded-lg transition-colors">
            <Smartphone className="h-5 w-5 text-green-400 mr-3" />
            <div className="text-left">
              <p className="text-white font-medium">Quản lý thiết bị</p>
              <p className="text-gray-400 text-sm">Xem và quản lý thiết bị đã đăng nhập</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile': return renderProfileSettings();
      case 'notifications': return renderNotificationSettings();
      case 'privacy': return renderPrivacySettings();
      case 'display': return renderDisplaySettings();
      case 'security': return renderSecuritySettings();
      default: return renderProfileSettings();
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Cài đặt</h1>
          <p className="text-gray-400">Tùy chỉnh trải nghiệm của bạn</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-red-600 text-white'
                          : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
              {renderTabContent()}
            </div>

            {/* Save/Reset Buttons */}
            {isChanged && (
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={handleReset}
                  className="flex items-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  <X className="h-4 w-4 mr-2" />
                  Hủy thay đổi
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-lg transition-all duration-300"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Lưu thay đổi
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
