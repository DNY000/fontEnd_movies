import React from 'react';
import Header from '../components/layout/Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">CinemaBooking</h3>
              <p className="text-gray-400 mb-4">
                Hệ thống đặt vé xem phim trực tuyến hàng đầu Việt Nam. 
                Trải nghiệm điện ảnh tuyệt vời với công nghệ hiện đại.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Dịch vụ</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Đặt vé online</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Rạp chiếu</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Khuyến mãi</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tin tức</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Hỗ trợ</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Liên hệ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Chính sách</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Điều khoản</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 CinemaBooking. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
