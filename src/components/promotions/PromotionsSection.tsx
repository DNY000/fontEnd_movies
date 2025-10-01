import React, { useState } from 'react';
import { Gift, Calendar, Clock, Users, Star, Copy, Check } from 'lucide-react';

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
}

const PromotionsSection: React.FC = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const promotionTypes = [
    { id: 'all', label: 'Tất cả', icon: <Gift className="h-4 w-4" /> },
    { id: 'discount', label: 'Giảm giá', icon: <Star className="h-4 w-4" /> },
    { id: 'combo', label: 'Combo', icon: <Users className="h-4 w-4" /> },
    { id: 'special', label: 'Đặc biệt', icon: <Gift className="h-4 w-4" /> },
    { id: 'membership', label: 'Thành viên', icon: <Star className="h-4 w-4" /> }
  ];

  const promotions: Promotion[] = [
    {
      id: '1',
      title: 'Giảm 50% vé xem phim thứ 3',
      description: 'Áp dụng cho tất cả suất chiếu vào thứ 3 hàng tuần',
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
      description: 'Combo bắp rang bơ lớn + 2 nước ngọt + kẹo',
      discount: '30%',
      code: 'COMBO99',
      validFrom: '2023-10-15',
      validTo: '2023-11-15',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500',
      type: 'combo',
      usageLimit: 500,
      usedCount: 89,
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
      description: 'Chúc mừng sinh nhật! Giảm giá đặc biệt cho khách hàng có sinh nhật trong tháng',
      discount: '70%',
      code: 'BIRTHDAY70',
      validFrom: '2023-10-01',
      validTo: '2023-10-31',
      image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=500',
      type: 'special',
      maxDiscount: 100000,
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
      description: 'Nâng cấp miễn phí lên ghế VIP cho thành viên Platinum',
      discount: 'Miễn phí',
      code: 'VIPFREE',
      validFrom: '2023-10-01',
      validTo: '2023-12-31',
      image: 'https://images.unsplash.com/photo-1489599735734-79b4169c2a78?w=500',
      type: 'membership',
      terms: [
        'Chỉ dành cho thành viên Platinum',
        'Áp dụng khi còn ghế VIP trống',
        'Không áp dụng cho suất chiếu đặc biệt',
        'Có thể sử dụng nhiều lần'
      ]
    }
  ];

  const filteredPromotions = selectedType === 'all' 
    ? promotions 
    : promotions.filter(promo => promo.type === selectedType);

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

  return (
    <div className="bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Khuyến Mãi Đặc Biệt</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Những ưu đãi hấp dẫn dành riêng cho bạn
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {promotionTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                selectedType === type.id
                  ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
              }`}
            >
              {type.icon}
              <span>{type.label}</span>
            </button>
          ))}
        </div>

        {/* Promotions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPromotions.map((promotion) => (
            <div
              key={promotion.id}
              className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-gray-600/50 hover:bg-gray-700/50 transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Image & Badge */}
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

                {/* Discount Badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-red-600 text-white px-3 py-2 rounded-xl font-bold text-lg">
                    -{promotion.discount}
                  </div>
                </div>

                {/* Usage Progress */}
                {promotion.usageLimit && (
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2">
                      <div className="flex justify-between text-white text-xs mb-1">
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

                {/* Code */}
                <div className="bg-gray-700/50 border border-gray-600/50 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-xs">Mã khuyến mãi</p>
                      <p className="text-white font-mono font-bold">{promotion.code}</p>
                    </div>
                    <button
                      onClick={() => copyCode(promotion.code)}
                      className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
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

                {/* Terms Preview */}
                <div className="text-xs text-gray-500">
                  <p className="font-medium mb-1">Điều kiện:</p>
                  <ul className="space-y-1">
                    {promotion.terms.slice(0, 2).map((term, index) => (
                      <li key={index}>• {term}</li>
                    ))}
                    {promotion.terms.length > 2 && (
                      <li className="text-blue-400 cursor-pointer hover:text-blue-300">
                        + {promotion.terms.length - 2} điều kiện khác
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25">
            Xem tất cả khuyến mãi
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromotionsSection;
