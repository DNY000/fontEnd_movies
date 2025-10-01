import React, { useState } from 'react';
import { 
  Plus, Search, Filter, Edit, Trash2, Gift, Calendar,
  Percent, Users, Save, X, Copy, Check
} from 'lucide-react';

interface Promotion {
  id: string;
  title: string;
  description: string;
  code: string;
  discount: string;
  type: 'percentage' | 'fixed' | 'combo';
  validFrom: string;
  validTo: string;
  usageLimit: number;
  usedCount: number;
  minSpend?: number;
  maxDiscount?: number;
  status: 'active' | 'inactive' | 'expired';
  image: string;
}

const PromotionsManagement: React.FC = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([
    {
      id: '1',
      title: 'Giảm 50% vé xem phim thứ 3',
      description: 'Áp dụng cho tất cả suất chiếu vào thứ 3 hàng tuần',
      code: 'TUESDAY50',
      discount: '50%',
      type: 'percentage',
      validFrom: '2023-10-01',
      validTo: '2023-12-31',
      usageLimit: 1000,
      usedCount: 234,
      minSpend: 100000,
      maxDiscount: 50000,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1489599735734-79b4169c2a78?w=500'
    },
    {
      id: '2',
      title: 'Combo Bắp Nước chỉ 99k',
      description: 'Combo bắp rang bơ lớn + 2 nước ngọt + kẹo',
      code: 'COMBO99',
      discount: '30%',
      type: 'combo',
      validFrom: '2023-10-15',
      validTo: '2023-11-15',
      usageLimit: 500,
      usedCount: 89,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);
  const [formData, setFormData] = useState<Partial<Promotion>>({});
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const statusOptions = [
    { value: 'all', label: 'Tất cả trạng thái' },
    { value: 'active', label: 'Đang hoạt động' },
    { value: 'inactive', label: 'Tạm dừng' },
    { value: 'expired', label: 'Hết hạn' }
  ];

  const typeOptions = [
    { value: 'all', label: 'Tất cả loại' },
    { value: 'percentage', label: 'Giảm theo %' },
    { value: 'fixed', label: 'Giảm cố định' },
    { value: 'combo', label: 'Combo đặc biệt' }
  ];

  const filteredPromotions = promotions.filter(promotion => {
    const matchesSearch = promotion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         promotion.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || promotion.status === selectedStatus;
    const matchesType = selectedType === 'all' || promotion.type === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleAddPromotion = () => {
    setEditingPromotion(null);
    setFormData({
      title: '',
      description: '',
      code: '',
      discount: '',
      type: 'percentage',
      validFrom: new Date().toISOString().split('T')[0],
      validTo: '',
      usageLimit: 100,
      usedCount: 0,
      status: 'active',
      image: ''
    });
    setShowModal(true);
  };

  const handleEditPromotion = (promotion: Promotion) => {
    setEditingPromotion(promotion);
    setFormData(promotion);
    setShowModal(true);
  };

  const handleDeletePromotion = (promotionId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa khuyến mãi này?')) {
      setPromotions(promotions.filter(promotion => promotion.id !== promotionId));
    }
  };

  const handleSavePromotion = () => {
    if (editingPromotion) {
      setPromotions(promotions.map(promotion => 
        promotion.id === editingPromotion.id ? { ...promotion, ...formData } : promotion
      ));
    } else {
      const newPromotion: Promotion = {
        ...formData as Promotion,
        id: Date.now().toString()
      };
      setPromotions([...promotions, newPromotion]);
    }
    setShowModal(false);
    setFormData({});
  };

  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Đang hoạt động';
      case 'inactive': return 'Tạm dừng';
      case 'expired': return 'Hết hạn';
      default: return status;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'percentage': return 'Giảm theo %';
      case 'fixed': return 'Giảm cố định';
      case 'combo': return 'Combo đặc biệt';
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quản lý khuyến mãi</h2>
          <p className="mt-1 text-sm text-gray-600">
            Tạo và quản lý các chương trình khuyến mãi
          </p>
        </div>
        <button
          onClick={handleAddPromotion}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Thêm khuyến mãi</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Gift className="h-8 w-8 text-blue-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Tổng khuyến mãi</p>
              <p className="text-2xl font-semibold text-gray-900">{promotions.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Check className="h-8 w-8 text-green-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Đang hoạt động</p>
              <p className="text-2xl font-semibold text-gray-900">
                {promotions.filter(p => p.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Lượt sử dụng</p>
              <p className="text-2xl font-semibold text-gray-900">
                {promotions.reduce((sum, p) => sum + p.usedCount, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Percent className="h-8 w-8 text-orange-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Tỷ lệ sử dụng</p>
              <p className="text-2xl font-semibold text-gray-900">
                {Math.round(
                  (promotions.reduce((sum, p) => sum + p.usedCount, 0) /
                   promotions.reduce((sum, p) => sum + p.usageLimit, 0)) * 100
                )}%
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
                placeholder="Tìm kiếm khuyến mãi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
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
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {typeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Promotions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPromotions.map((promotion) => (
          <div key={promotion.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="relative h-48 overflow-hidden rounded-t-lg">
              <img
                src={promotion.image}
                alt={promotion.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(promotion.status)}`}>
                  {getStatusLabel(promotion.status)}
                </span>
              </div>
              <div className="absolute bottom-4 right-4">
                <div className="bg-red-600 text-white px-3 py-2 rounded-xl font-bold text-lg">
                  -{promotion.discount}
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{promotion.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{promotion.description}</p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Loại:</span>
                  <span className="font-medium">{getTypeLabel(promotion.type)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Hiệu lực:</span>
                  <span className="font-medium">
                    {new Date(promotion.validFrom).toLocaleDateString('vi-VN')} - {new Date(promotion.validTo).toLocaleDateString('vi-VN')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Sử dụng:</span>
                  <span className="font-medium">{promotion.usedCount}/{promotion.usageLimit}</span>
                </div>
              </div>

              {/* Usage Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-gray-400 text-xs mb-1">
                  <span>Đã sử dụng</span>
                  <span>{Math.round((promotion.usedCount / promotion.usageLimit) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-red-600 to-red-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(promotion.usedCount / promotion.usageLimit) * 100}%` }}
                  />
                </div>
              </div>

              {/* Code */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-xs">Mã khuyến mãi</p>
                    <p className="text-gray-900 font-mono font-bold">{promotion.code}</p>
                  </div>
                  <button
                    onClick={() => copyCode(promotion.code)}
                    className="flex items-center space-x-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
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

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  ID: {promotion.id}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditPromotion(promotion)}
                    className="text-blue-600 hover:text-blue-800 p-1 rounded"
                    title="Chỉnh sửa"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeletePromotion(promotion.id)}
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
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {editingPromotion ? 'Chỉnh sửa khuyến mãi' : 'Thêm khuyến mãi mới'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tiêu đề *
                  </label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mã khuyến mãi *
                  </label>
                  <input
                    type="text"
                    value={formData.code || ''}
                    onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Giá trị giảm *
                  </label>
                  <input
                    type="text"
                    value={formData.discount || ''}
                    onChange={(e) => setFormData({...formData, discount: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="50% hoặc 100000"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Loại khuyến mãi *
                  </label>
                  <select
                    value={formData.type || ''}
                    onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Chọn loại</option>
                    <option value="percentage">Giảm theo %</option>
                    <option value="fixed">Giảm cố định</option>
                    <option value="combo">Combo đặc biệt</option>
                  </select>
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
                    <option value="active">Đang hoạt động</option>
                    <option value="inactive">Tạm dừng</option>
                    <option value="expired">Hết hạn</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ngày bắt đầu *
                  </label>
                  <input
                    type="date"
                    value={formData.validFrom || ''}
                    onChange={(e) => setFormData({...formData, validFrom: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ngày kết thúc *
                  </label>
                  <input
                    type="date"
                    value={formData.validTo || ''}
                    onChange={(e) => setFormData({...formData, validTo: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Giới hạn sử dụng
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.usageLimit || ''}
                    onChange={(e) => setFormData({...formData, usageLimit: parseInt(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mô tả
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description || ''}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
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
            </form>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleSavePromotion}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>{editingPromotion ? 'Cập nhật' : 'Thêm mới'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromotionsManagement;
