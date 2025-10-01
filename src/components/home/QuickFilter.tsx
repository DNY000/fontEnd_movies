import React, { useState } from 'react';
import { MapPin, Calendar, Film, Clock, ChevronDown } from 'lucide-react';

interface QuickFilterProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  cinema: string;
  date: string;
  movie: string;
  showtime: string;
}

const QuickFilter: React.FC<QuickFilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterState>({
    cinema: '',
    date: '',
    movie: '',
    showtime: ''
  });

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const cinemas = [
    'CGV Vincom Center',
    'Lotte Cinema Landmark',
    'Galaxy Cinema Nguyễn Du',
    'BHD Star Cineplex',
    'Cinestar Hai Bà Trưng'
  ];

  const movies = [
    'Avatar: The Way of Water',
    'Black Panther: Wakanda Forever',
    'Top Gun: Maverick',
    'Doctor Strange 2',
    'Thor: Love and Thunder'
  ];

  const showtimes = [
    '09:00', '11:30', '14:00', '16:30', '19:00', '21:30'
  ];

  const getNext7Days = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push({
        value: date.toISOString().split('T')[0],
        label: i === 0 ? 'Hôm nay' : i === 1 ? 'Ngày mai' : date.toLocaleDateString('vi-VN', { 
          weekday: 'short', 
          day: '2-digit', 
          month: '2-digit' 
        })
      });
    }
    return days;
  };

  const dates = getNext7Days();

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
    setOpenDropdown(null);
  };

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const FilterDropdown = ({ 
    icon: Icon, 
    label, 
    value, 
    options, 
    filterKey 
  }: {
    icon: any;
    label: string;
    value: string;
    options: Array<{ value: string; label: string }> | string[];
    filterKey: keyof FilterState;
  }) => {
    const isOpen = openDropdown === filterKey;
    const displayValue = value || label;

    return (
      <div className="relative">
        <button
          onClick={() => toggleDropdown(filterKey)}
          className={`flex items-center space-x-3 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-gray-600/50 text-white px-4 py-3 rounded-xl transition-all duration-300 min-w-[180px] ${
            isOpen ? 'border-red-500/50 bg-gray-700/50' : ''
          }`}
        >
          <Icon className="h-5 w-5 text-gray-400" />
          <span className="flex-1 text-left truncate">
            {displayValue}
          </span>
          <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`} />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto">
            {(typeof options[0] === 'string' ? options as string[] : options as Array<{ value: string; label: string }>).map((option, index) => {
              const optionValue = typeof option === 'string' ? option : option.value;
              const optionLabel = typeof option === 'string' ? option : option.label;
              
              return (
                <button
                  key={index}
                  onClick={() => handleFilterChange(filterKey, optionValue)}
                  className="w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors first:rounded-t-xl last:rounded-b-xl"
                >
                  {optionLabel}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const handleQuickBook = () => {
    if (filters.cinema && filters.date && filters.movie && filters.showtime) {
      // Handle quick booking logic
      console.log('Quick booking with filters:', filters);
    }
  };

  const isComplete = filters.cinema && filters.date && filters.movie && filters.showtime;

  return (
    <div className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white font-bold text-xl">Đặt Vé Nhanh</h3>
        <div className="text-sm text-gray-400">
          Chọn thông tin để đặt vé
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <FilterDropdown
          icon={MapPin}
          label="Chọn rạp"
          value={filters.cinema}
          options={cinemas}
          filterKey="cinema"
        />

        <FilterDropdown
          icon={Calendar}
          label="Chọn ngày"
          value={filters.date}
          options={dates}
          filterKey="date"
        />

        <FilterDropdown
          icon={Film}
          label="Chọn phim"
          value={filters.movie}
          options={movies}
          filterKey="movie"
        />

        <FilterDropdown
          icon={Clock}
          label="Chọn suất"
          value={filters.showtime}
          options={showtimes}
          filterKey="showtime"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleQuickBook}
          disabled={!isComplete}
          className={`flex-1 flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300 ${
            isComplete
              ? 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white transform hover:scale-105 shadow-lg hover:shadow-red-500/25'
              : 'bg-gray-700/50 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Film className="h-5 w-5 mr-2" />
          Đặt Vé Ngay
        </button>

        <button
          onClick={() => setFilters({ cinema: '', date: '', movie: '', showtime: '' })}
          className="px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/50 hover:border-gray-500/50 text-gray-300 hover:text-white rounded-xl font-semibold transition-all duration-300"
        >
          Đặt lại
        </button>
      </div>

      {/* Progress Indicator */}
      <div className="mt-4 flex items-center space-x-2">
        <div className="flex-1 bg-gray-700/50 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-red-600 to-red-500 h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${(Object.values(filters).filter(Boolean).length / 4) * 100}%` 
            }}
          />
        </div>
        <span className="text-sm text-gray-400">
          {Object.values(filters).filter(Boolean).length}/4
        </span>
      </div>
    </div>
  );
};

export default QuickFilter;
