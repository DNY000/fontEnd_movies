import React, { useState } from 'react';
import { Gift, Calendar, Clock, Users, Star, Copy, Check, Filter, Search, Tag, Percent } from 'lucide-react';

interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: string;
  code: string;
  validFrom: string;
  validTo: string;
  image: string;
  type: 'discount' | 'combo' | 'special' | 'membership';
  minSpend?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usedCount?: number;
  terms: string[];
  isUsed?: boolean;
  isFavorite?: boolean;
}

const PromotionsPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const promotionTypes = [
    { id: 'all', label: 'Tất cả', icon: <Gift className="h-4 w-4" /> },
    { id: 'discount', label: 'Giảm giá', icon: <Percent className="h-4 w-4" /> },
    { id: 'combo', label: 'Combo', icon: <Users className="h-4 w-4" /> },
    { id: 'special', label: 'Đặc biệt', icon: <Star className="h-4 w-4" /> },
    { id: 'membership', label: 'Thành viên', icon: <Tag className="h-4 w-4" /> }
  ];

  const statusOptions = [
    { id: 'all', label: 'Tất cả' },
    { id: 'available', label: 'Có thể sử dụng' },
    { id: 'used', label: 'Đã sử dụng' },
    { id: 'expired', label: 'Hết hạn' }
  ];

  const promotions: Promotion[] = [
    {
      id: '1',
      title: 'Giảm 50% vé xem phim thứ 3',
      description: 'Áp dụng cho tất cả suất chiếu vào thứ 3 hàng tuần. Không áp dụng cho phim 3D và IMAX.',
      discount: '50%',
      code: 'TUESDAY50',
      validFrom: '2023-10-01',
      validTo: '2023-12-31',
      image: 'https://images.unsplash.com/photo-1489599735734-79b4169c2a78?w=500',
      type: 'discount',
      minSpend: 100000,
      maxDiscount: 50000,
      usageLimit: 1000,
      usedCount: 234,
      isUsed: false,
      isFavorite: true,
      terms: [
        'Áp dụng cho tất cả phim đang chiếu',
        'Không áp dụng cho phim 3D và IMAX',
        'Mỗi khách hàng chỉ sử dụng 1 lần/tuần',
        'Không áp dụng cùng với ưu đãi khác'
      ]
    },
    {
      id: '2',
      title: 'Combo Bắp Nước chỉ 99k',
      description: 'Combo bắp rang bơ lớn + 2 nước ngọt + kẹo. Tiết kiệm 30% so với giá lẻ.',
      discount: '30%',
      code: 'COMBO99',
      validFrom: '2023-10-15',
      validTo: '2023-11-15',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500',
      type: 'combo',
      usageLimit: 500,
      usedCount: 89,
      isUsed: true,
      isFavorite: false,
      terms: [
        'Áp dụng tại quầy bán hàng',
        'Có thể mua kèm với vé xem phim',
        'Không áp dụng giao hàng',
        'Số lượng có hạn'
      ]
    },
    {
      id: '3',
      title: 'Ưu đãi sinh nhật - Giảm 70%',
      description: 'Chúc mừng sinh nhật! Giảm giá đặc biệt cho khách hàng có sinh nhật trong tháng.',
      discount: '70%',
      code: 'BIRTHDAY70',
      validFrom: '2023-10-01',
      validTo: '2023-10-31',
      image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=500',
      type: 'special',
      maxDiscount: 100000,
      isUsed: false,
      isFavorite: true,
      terms: [
        'Chỉ áp dụng trong tháng sinh nhật',
        'Cần xuất trình CMND/CCCD',
        'Áp dụng cho tối đa 4 vé',
        'Không áp dụng cho ngày lễ'
      ]
    },
    {
      id: '4',
      title: 'Thành viên VIP - Miễn phí nâng cấp ghế',
      description: 'Nâng cấp miễn phí lên ghế VIP cho thành viên Platinum. Áp dụng khi còn ghế trống.',
      discount: 'Miễn phí',
      code: 'VIPFREE',
      validFrom: '2023-10-01',
      validTo: '2023-12-31',
      image: 'https://images.unsplash.com/photo-1489599735734-79b4169c2a78?w=500',
      type: 'membership',
      isUsed: false,
      isFavorite: false,
      terms: [
        'Chỉ dành cho thành viên Platinum',
        'Áp dụng khi còn ghế VIP trống',
        'Không áp dụng cho suất chiếu đặc biệt',
        'Có thể sử dụng nhiều lần'
      ]
    },
    {
      id: '5',
      title: 'Flash Sale - Giảm 80% vé cuối tuần',
      description: 'Ưu đãi có thời hạn! Giảm 80% cho tất cả vé xem phim vào cuối tuần.',
      discount: '80%',
      code: 'FLASH80',
      validFrom: '2023-09-01',
      validTo: '2023-09-30',
      image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500',
      type: 'special',
      maxDiscount: 80000,
      isUsed: false,
      isFavorite: false,
      terms: [
        'Chỉ áp dụng thứ 7 và chủ nhật',
        'Số lượng có hạn',
        'Không hoàn tiền khi hủy vé',
        'Áp dụng cho tất cả rạp'
      ]
    }
  ];

  const getPromotionStatus = (promotion: Promotion) => {
    const now = new Date();
    const validTo = new Date(promotion.validTo);
    
    if (promotion.isUsed) return 'used';
    if (validTo < now) return 'expired';
    return 'available';
  };

  const filteredPromotions = promotions.filter(promotion => {
    const matchesType = selectedType === 'all' || promotion.type === selectedType;
    const status = getPromotionStatus(promotion);
    const matchesStatus = selectedStatus === 'all' || status === selectedStatus;
    const matchesSearch = promotion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         promotion.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'discount': return 'from-blue-600 to-blue-500';
      case 'combo': return 'from-green-600 to-green-500';
      case 'special': return 'from-purple-600 to-purple-500';
      case 'membership': return 'from-yellow-600 to-yellow-500';
      default: return 'from-gray-600 to-gray-500';
    }
  };

  const getTypeLabel = (type: string) => {
    return promotionTypes.find(t => t.id === type)?.label || type;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500/20 text-green-400';
      case 'used': return 'bg-gray-500/20 text-gray-400';
      case 'expired': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available': return 'Có thể sử dụng';
      case 'used': return 'Đã sử dụng';
      case 'expired': return 'Hết hạn';
      default: return status;
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Ưu đãi của tôi</h1>
          <p className="text-gray-400">
            Quản lý và sử dụng các mã khuyến mãi của bạn
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 text-center">
            <Gift className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{promotions.length}</p>
            <p className="text-gray-400 text-sm">Tổng ưu đãi</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 text-center">
            <Check className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">
              {promotions.filter(p => getPromotionStatus(p) === 'available').length}
            </p>
            <p className="text-gray-400 text-sm">Có thể dùng</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 text-center">
            <Clock className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">
              {promotions.filter(p => p.isUsed).length}
            </p>
            <p className="text-gray-400 text-sm">Đã sử dụng</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 text-center">
            <Star className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">
              {promotions.filter(p => p.isFavorite).length}
            </p>
            <p className="text-gray-400 text-sm">Yêu thích</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm ưu đãi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div className="flex flex-wrap gap-2">
              {promotionTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedType === type.id
                      ? 'bg-gradient-to-r from-red-600 to-red-500 text-white'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'
                  }`}
                >
                  {type.icon}
                  <span>{type.label}</span>
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((status) => (
                <button
                  key={status.id}
                  onClick={() => setSelectedStatus(status.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedStatus === status.id
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Promotions Grid */}
        {filteredPromotions.length === 0 ? (
          <div className="text-center py-16">
            <Gift className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              Không tìm thấy ưu đãi nào
            </h3>
            <p className="text-gray-500">
              {searchQuery ? 'Thử tìm kiếm với từ khóa khác' : 'Bạn chưa có ưu đãi nào'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPromotions.map((promotion) => {
              const status = getPromotionStatus(promotion);
              return (
                <div
                  key={promotion.id}
                  className={`group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-gray-600/50 hover:bg-gray-700/50 transition-all duration-300 transform hover:-translate-y-2 ${
                    status === 'expired' || status === 'used' ? 'opacity-60' : ''
                  }`}
                >
                  {/* Image & Badges */}
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={promotion.image}
                      alt={promotion.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Type Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`bg-gradient-to-r ${getTypeColor(promotion.type)} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                        {getTypeLabel(promotion.type)}
                      </span>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
                        {getStatusLabel(status)}
                      </span>
                    </div>

                    {/* Discount Badge */}
                    <div className="absolute bottom-4 right-4">
                      <div className="bg-red-600 text-white px-3 py-2 rounded-xl font-bold text-lg">
                        -{promotion.discount}
                      </div>
                    </div>

                    {/* Favorite */}
                    {promotion.isFavorite && (
                      <div className="absolute bottom-4 left-4">
                        <Star className="h-6 w-6 text-yellow-400 fill-current" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-white font-bold text-lg mb-2 group-hover:text-blue-400 transition-colors">
                      {promotion.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {promotion.description}
                    </p>

                    {/* Validity */}
                    <div className="flex items-center text-gray-500 text-xs mb-4">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>Từ {formatDate(promotion.validFrom)} đến {formatDate(promotion.validTo)}</span>
                    </div>

                    {/* Usage Progress */}
                    {promotion.usageLimit && (
                      <div className="mb-4">
                        <div className="flex justify-between text-gray-400 text-xs mb-1">
                          <span>Đã sử dụng</span>
                          <span>{promotion.usedCount}/{promotion.usageLimit}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-red-600 to-red-500 h-2 rounded-full transition-all duration-300"
                            style={{ 
                              width: `${((promotion.usedCount || 0) / promotion.usageLimit) * 100}%` 
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Code */}
                    <div className="bg-gray-700/50 border border-gray-600/50 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-xs">Mã khuyến mãi</p>
                          <p className="text-white font-mono font-bold">{promotion.code}</p>
                        </div>
                        <button
                          onClick={() => copyCode(promotion.code)}
                          disabled={status === 'expired' || status === 'used'}
                          className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            status === 'expired' || status === 'used'
                              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                              : 'bg-red-600 hover:bg-red-700 text-white'
                          }`}
                        >
                          {copiedCode === promotion.code ? (
                            <>
                              <Check className="h-4 w-4" />
                              <span>Đã sao</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" />
                              <span>Sao chép</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      disabled={status === 'expired' || status === 'used'}
                      className={`w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-300 ${
                        status === 'expired' || status === 'used'
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white transform hover:scale-105'
                      }`}
                    >
                      {status === 'used' ? 'Đã sử dụng' : status === 'expired' ? 'Hết hạn' : 'Sử dụng ngay'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PromotionsPage;
