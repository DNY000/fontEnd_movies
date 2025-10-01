import React, { useState } from 'react';
import { Calendar, User, Eye, ArrowRight, Clock, Search, Filter, TrendingUp } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  publishDate: string;
  views: number;
  category: string;
  readTime: string;
  featured: boolean;
  tags: string[];
}

const NewsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');

  const categories = [
    { id: 'all', label: 'Tất cả', count: 24 },
    { id: 'movie-news', label: 'Tin phim', count: 12 },
    { id: 'cinema-news', label: 'Tin rạp', count: 6 },
    { id: 'celebrity', label: 'Sao & Nghệ sĩ', count: 8 },
    { id: 'review', label: 'Đánh giá', count: 5 },
    { id: 'event', label: 'Sự kiện', count: 3 }
  ];

  const sortOptions = [
    { value: 'latest', label: 'Mới nhất' },
    { value: 'popular', label: 'Phổ biến' },
    { value: 'trending', label: 'Thịnh hành' }
  ];

  const newsItems: NewsItem[] = [
    {
      id: '1',
      title: 'Avatar: The Way of Water - Siêu phẩm điện ảnh trở lại sau 13 năm chờ đợi',
      excerpt: 'James Cameron mang đến một tác phẩm nghệ thuật đỉnh cao với công nghệ 3D tiên tiến nhất hiện tại, hứa hẹn sẽ làm thay đổi ngành công nghiệp điện ảnh.',
      content: 'Nội dung chi tiết về bộ phim...',
      image: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
      author: 'Nguyễn Văn A',
      publishDate: '2023-10-15',
      views: 15420,
      category: 'movie-news',
      readTime: '5 phút',
      featured: true,
      tags: ['Avatar', 'James Cameron', '3D', 'Sci-Fi']
    },
    {
      id: '2',
      title: 'CGV Vincom Center khai trương phòng chiếu IMAX mới với âm thanh Dolby Atmos',
      excerpt: 'Trải nghiệm điện ảnh đỉnh cao với màn hình IMAX khổng lồ và hệ thống âm thanh vòm 360 độ, mang đến cảm giác như đang ở trong phim.',
      content: 'Chi tiết về rạp chiếu mới...',
      image: 'https://images.unsplash.com/photo-1489599735734-79b4169c2a78?w=500',
      author: 'Trần Thị B',
      publishDate: '2023-10-14',
      views: 8930,
      category: 'cinema-news',
      readTime: '3 phút',
      featured: false,
      tags: ['CGV', 'IMAX', 'Dolby Atmos', 'Công nghệ']
    },
    {
      id: '3',
      title: 'Ryan Reynolds xác nhận Deadpool 3 sẽ có sự xuất hiện của Wolverine',
      excerpt: 'Hugh Jackman chính thức trở lại vai diễn Wolverine sau khi tuyên bố giải nghệ, hứa hẹn một bộ phim bom tấn đầy bất ngờ.',
      content: 'Thông tin về dự án phim mới...',
      image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=500',
      author: 'Lê Văn C',
      publishDate: '2023-10-13',
      views: 23150,
      category: 'celebrity',
      readTime: '4 phút',
      featured: true,
      tags: ['Deadpool', 'Wolverine', 'Marvel', 'Hugh Jackman']
    },
    {
      id: '4',
      title: 'Top Gun: Maverick - Bom tấn hành động đáng xem nhất năm 2023',
      excerpt: 'Tom Cruise một lần nữa chứng minh tài năng diễn xuất với những pha hành động nghẹt thở và câu chuyện cảm động về tình bạn.',
      content: 'Đánh giá chi tiết về bộ phim...',
      image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500',
      author: 'Phạm Thị D',
      publishDate: '2023-10-12',
      views: 12780,
      category: 'review',
      readTime: '6 phút',
      featured: false,
      tags: ['Top Gun', 'Tom Cruise', 'Hành động', 'Review']
    },
    {
      id: '5',
      title: 'Lễ hội phim quốc tế TP.HCM 2023 - Quy tụ những tác phẩm xuất sắc',
      excerpt: 'Sự kiện điện ảnh lớn nhất năm với sự tham gia của hơn 100 bộ phim từ 30 quốc gia, mang đến những trải nghiệm văn hóa đa dạng.',
      content: 'Thông tin về lễ hội phim...',
      image: 'https://images.unsplash.com/photo-1489599735734-79b4169c2a78?w=500',
      author: 'Hoàng Văn E',
      publishDate: '2023-10-11',
      views: 6540,
      category: 'event',
      readTime: '4 phút',
      featured: false,
      tags: ['Lễ hội phim', 'TP.HCM', 'Quốc tế', 'Văn hóa']
    },
    {
      id: '6',
      title: 'Black Panther: Wakanda Forever - Tạm biệt một huyền thoại',
      excerpt: 'Bộ phim cuối cùng trong series Black Panther mang đến những cảm xúc sâu lắng và là lời tri ân xứng đáng cho Chadwick Boseman.',
      content: 'Đánh giá và phân tích phim...',
      image: 'https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg',
      author: 'Nguyễn Thị F',
      publishDate: '2023-10-10',
      views: 18920,
      category: 'movie-news',
      readTime: '7 phút',
      featured: true,
      tags: ['Black Panther', 'Marvel', 'Chadwick Boseman', 'Wakanda']
    }
  ];

  const filteredNews = newsItems
    .filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.views - a.views;
        case 'trending':
          return b.featured ? 1 : -1;
        case 'latest':
        default:
          return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
      }
    });

  const featuredNews = newsItems.filter(item => item.featured);
  const latestNews = newsItems.slice(0, 3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  return (
    <div className="bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Tin Tức Điện Ảnh</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Cập nhật những tin tức mới nhất về thế giới điện ảnh và giải trí
          </p>
        </div>

        {/* Featured News */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <TrendingUp className="h-6 w-6 text-red-500 mr-3" />
            <h2 className="text-2xl font-bold text-white">Tin nổi bật</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredNews.slice(0, 2).map((news, index) => (
              <article
                key={news.id}
                className={`group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-gray-600/50 hover:bg-gray-700/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer ${
                  index === 0 ? 'lg:col-span-2' : ''
                }`}
              >
                <div className={`${index === 0 ? 'lg:flex lg:gap-8' : ''}`}>
                  <div className={`relative overflow-hidden ${
                    index === 0 ? 'lg:w-1/2 h-64 lg:h-auto' : 'h-48'
                  }`}>
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Nổi bật
                      </span>
                    </div>
                  </div>
                  
                  <div className={`p-6 ${index === 0 ? 'lg:w-1/2 lg:flex lg:flex-col lg:justify-center' : ''}`}>
                    <div className="flex items-center text-gray-400 text-sm mb-3">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(news.publishDate)}
                      <span className="mx-2">•</span>
                      <Clock className="h-4 w-4 mr-1" />
                      {news.readTime}
                    </div>
                    
                    <h3 className={`text-white font-bold mb-3 group-hover:text-blue-400 transition-colors ${
                      index === 0 ? 'text-2xl lg:text-3xl' : 'text-xl'
                    }`}>
                      {news.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-4 leading-relaxed">
                      {news.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {news.author}
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {formatViews(news.views)}
                        </div>
                      </div>
                      
                      <button className="flex items-center text-red-400 hover:text-red-300 font-medium transition-colors">
                        Đọc thêm
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
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
                  placeholder="Tìm kiếm tin tức..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-red-600 to-red-500 text-white'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'
                  }`}
                >
                  <span>{category.label}</span>
                  <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-700/50 border border-gray-600 rounded-lg text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((news) => (
            <article
              key={news.id}
              className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-gray-600/50 hover:bg-gray-700/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {categories.find(cat => cat.id === news.category)?.label}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-gray-400 text-sm mb-3">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(news.publishDate)}
                </div>
                
                <h3 className="text-white font-bold text-lg mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors">
                  {news.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {news.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {news.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {news.author}
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      {formatViews(news.views)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {news.readTime}
                    </div>
                  </div>
                  
                  <button className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors">
                    Đọc thêm →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* No Results */}
        {filteredNews.length === 0 && (
          <div className="text-center py-16">
            <Search className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              Không tìm thấy tin tức nào
            </h3>
            <p className="text-gray-500">
              Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
            </p>
          </div>
        )}

        {/* Load More */}
        {filteredNews.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25">
              Tải thêm tin tức
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
