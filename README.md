# 🎬 Cinema Booking - Hệ thống đặt vé xem phim

Một ứng dụng web hiện đại để đặt vé xem phim trực tuyến, được xây dựng với **React + TypeScript + Vite + TailwindCSS**.

## ✨ Tính năng chính

- 🎥 **Duyệt phim**: Xem danh sách phim đang chiếu, sắp chiếu và phổ biến
- 🔍 **Tìm kiếm**: Tìm kiếm phim theo tên, thể loại
- 📱 **Responsive**: Giao diện thân thiện trên mọi thiết bị
- 🎫 **Đặt vé**: Quy trình đặt vé đa bước với chọn ghế tương tác
- 💺 **Sơ đồ ghế**: Chọn ghế trực quan với trạng thái real-time
- 📋 **Quản lý đặt vé**: Xem lịch sử và quản lý vé đã đặt

## 🛠️ Công nghệ sử dụng

- **Frontend Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: TailwindCSS 3
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form + Yup validation
- **State Management**: React Hooks

## 🚀 Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js 18+ 
- npm hoặc yarn

### Cài đặt dependencies
```bash
npm install
```

### Chạy development server
```bash
npm run dev
```

Ứng dụng sẽ chạy tại: `http://localhost:5173`

### Build cho production
```bash
npm run build
```

## 📁 Cấu trúc thư mục

```
src/
├── components/          # Các component tái sử dụng
│   ├── common/         # Component chung
│   ├── movies/         # Component liên quan đến phim
│   └── booking/        # Component đặt vé và chọn ghế
├── pages/              # Các trang chính
├── layouts/            # Layout components
├── services/           # API services
├── types/              # TypeScript type definitions
└── data/               # Mock data cho demo
```

## 🎨 Giao diện

### Trang chủ
- Hero section với thanh tìm kiếm
- Tabs phân loại phim (Đang chiếu, Sắp chiếu, Phổ biến)
- Grid hiển thị danh sách phim với thông tin chi tiết

### Đặt vé
- **Bước 1**: Chọn ghế trên sơ đồ tương tác
- **Bước 2**: Nhập thông tin khách hàng
- **Bước 3**: Thanh toán
- **Bước 4**: Xác nhận đặt vé

## 🔧 Cấu hình

### Environment Variables
```env
REACT_APP_API_BASE_URL=http://localhost:3001/api
```

## 📄 License

Distributed under the MIT License.
# fontEnd_movies
