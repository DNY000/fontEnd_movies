import React, { useState } from 'react';
import { Calendar, User, Eye, ArrowRight, Clock } from 'lucide-react';

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
}

const NewsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Tất cả' },
    { id: 'movie-news', label: 'Tin phim' },
    { id: 'cinema-news', label: 'Tin rạp' },
    { id: 'celebrity', label: 'Sao & Nghệ sĩ' },
    { id: 'review', label: 'Đánh giá' }
  ];

  const newsItems: NewsItem[] = [
    {
      id: '1',
      title: 'Avatar: The Way of Water - Siêu phẩm điện ảnh trở lại sau 13 năm chờ đợi',
      excerpt: 'James Cameron mang đến một tác phẩm nghệ thuật đỉnh cao với công nghệ 3D tiên tiến nhất hiện tại.',
      content: 'Nội dung chi tiết về bộ phim...',
      image: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
      author: 'Nguyễn Văn A',
      publishDate: '2023-10-15',
      views: 15420,
      category: 'movie-news',
      readTime: '5 phút'
    },
    {
      id: '2',
      title: 'CGV Vincom Center khai trương phòng chiếu IMAX mới với âm thanh Dolby Atmos',
      excerpt: 'Trải nghiệm điện ảnh đỉnh cao với màn hình IMAX khổng lồ và hệ thống âm thanh vòm 360 độ.',
      content: 'Chi tiết về rạp chiếu mới...',
      image: 'https://images.unsplash.com/photo-1489599735734-79b4169c2a78?w=500',
      author: 'Trần Thị B',
      publishDate: '2023-10-14',
      views: 8930,
      category: 'cinema-news',
      readTime: '3 phút'
    },
    {
      id: '3',
      title: 'Ryan Reynolds xác nhận Deadpool 3 sẽ có sự xuất hiện của Wolverine',
      excerpt: 'Hugh Jackman chính thức trở lại vai diễn Wolverine sau khi tuyên bố giải nghệ.',
      content: 'Thông tin về dự án phim mới...',
      image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=500',
      author: 'Lê Văn C',
      publishDate: '2023-10-13',
      views: 23150,
      category: 'celebrity',
      readTime: '4 phút'
    },
    {
      id: '4',
      title: 'Top Gun: Maverick - Bom tấn hành động đáng xem nhất năm 2023',
      excerpt: 'Tom Cruise một lần nữa chứng minh tài năng diễn xuất với những pha hành động nghẹt thở.',
      content: 'Đánh giá chi tiết về bộ phim...',
      image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500',
      author: 'Phạm Thị D',
      publishDate: '2023-10-12',
      views: 12780,
      category: 'review',
      readTime: '6 phút'
    }
  ];

  const filteredNews = selectedCategory === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === selectedCategory);

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
    <div className="bg-gray-800 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Tin Tức Điện Ảnh</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Cập nhật những tin tức mới nhất về thế giới điện ảnh
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg'
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Featured News */}
        {filteredNews.length > 0 && (
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
              <div className="order-2 lg:order-1">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Nổi bật
                  </span>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(filteredNews[0].publishDate)}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                  {filteredNews[0].title}
                </h3>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {filteredNews[0].excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {filteredNews[0].author}
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {formatViews(filteredNews[0].views)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {filteredNews[0].readTime}
                    </div>
                  </div>
                  
                  <button className="flex items-center text-red-400 hover:text-red-300 font-medium transition-colors">
                    Đọc thêm
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                <img
                  src={filteredNews[0].image}
                  alt={filteredNews[0].title}
                  className="w-full h-64 lg:h-80 object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        )}

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.slice(1).map((news) => (
            <article
              key={news.id}
              className="group bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-gray-600/50 hover:bg-gray-800/50 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
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
                  </div>
                  
                  <button className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors">
                    Đọc thêm →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25">
            Xem thêm tin tức
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
