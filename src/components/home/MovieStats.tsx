import React from 'react';
import { Film, Users, Star, Calendar } from 'lucide-react';

const MovieStats: React.FC = () => {
  const stats = [
    {
      icon: Film,
      value: '1000+',
      label: 'Phim Hot',
      color: 'text-red-500'
    },
    {
      icon: Users,
      value: '50K+',
      label: 'Khách hàng',
      color: 'text-blue-500'
    },
    {
      icon: Star,
      value: '4.8',
      label: 'Đánh giá',
      color: 'text-yellow-500'
    },
    {
      icon: Calendar,
      value: '365',
      label: 'Ngày/năm',
      color: 'text-green-500'
    }
  ];

  return (
    <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 w-80">
      <h3 className="text-white font-bold text-lg mb-6 text-center">Platform Stats</h3>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="text-center p-4 bg-gray-700/30 rounded-xl border border-gray-600/30 hover:bg-gray-600/30 transition-colors">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gray-700/50 mb-3 group-hover:scale-110 transition-transform`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="text-xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieStats;
