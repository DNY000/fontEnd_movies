import React from 'react';
import { MapPin, Clock, Gift, Headphones } from 'lucide-react';

const QuickActions: React.FC = () => {
  const actions = [
    {
      icon: MapPin,
      title: 'Tìm Rạp',
      description: 'Rạp gần bạn',
      color: 'bg-blue-500',
    },
    {
      icon: Clock,
      title: 'Lịch Chiếu',
      description: 'Xem giờ chiếu',
      color: 'bg-green-500',
    },
    {
      icon: Gift,
      title: 'Khuyến Mãi',
      description: 'Ưu đãi hot',
      color: 'bg-purple-500',
    },
    {
      icon: Headphones,
      title: 'Hỗ Trợ',
      description: '24/7 support',
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Quick Actions</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Everything you need for the perfect movie experience
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <div
                key={index}
                className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 rounded-2xl p-6 hover:bg-gray-700/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              >
                <div className={`${action.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{action.title}</h3>
                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{action.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
