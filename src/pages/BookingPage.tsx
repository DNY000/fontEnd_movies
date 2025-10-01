import React, { useState, useEffect } from 'react';
import { Check, ChevronLeft, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import SeatMap from '../components/booking/SeatMap';
import ErrorMessage from '../components/common/ErrorMessage';
import { BookingService } from '../services';
import { mockShowtimes, generateMockSeats } from '../data/mockData';
import type { MovieShowtime, Seat, CustomerInfo, BookingRequest } from '../types';

const steps = ['Chọn ghế', 'Thông tin khách hàng', 'Thanh toán', 'Xác nhận'];

const BookingPage: React.FC = () => {
  const { showtimeId } = useParams<{ showtimeId: string }>();
  const navigate = useNavigate();
  
  const [activeStep, setActiveStep] = useState(0);
  const [showtime, setShowtime] = useState<MovieShowtime | null>(null);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    if (showtimeId) {
      loadShowtimeData();
    }
  }, [showtimeId]);

  const loadShowtimeData = async () => {
    try {
      setLoading(true);
      // For demo, use mock data
      const foundShowtime = mockShowtimes.find(st => st.id === showtimeId);
      if (foundShowtime) {
        setShowtime(foundShowtime);
        setSeats(generateMockSeats());
      } else {
        setError('Không tìm thấy suất chiếu');
      }
    } catch (err) {
      setError('Đã xảy ra lỗi khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  const handleSeatSelect = (seatId: string) => {
    setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    );
  };

  const handleNext = () => {
    if (activeStep === 0 && selectedSeats.length === 0) {
      setError('Vui lòng chọn ít nhất một ghế');
      return;
    }
    if (activeStep === 1 && !isCustomerInfoValid()) {
      setError('Vui lòng điền đầy đủ thông tin khách hàng');
      return;
    }
    setError('');
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const isCustomerInfoValid = () => {
    return customerInfo.name && customerInfo.email && customerInfo.phone;
  };

  const calculateTotal = () => {
    const selectedSeatObjects = seats.filter(seat => selectedSeats.includes(seat.id));
    return selectedSeatObjects.reduce((total, seat) => total + seat.price, 0);
  };

  const handleBooking = async () => {
    try {
      setBookingLoading(true);
      const bookingRequest: BookingRequest = {
        showtimeId: showtimeId!,
        selectedSeats,
        customerInfo,
        paymentMethod: {
          type: 'credit_card',
          details: {}
        }
      };

      const response = await BookingService.createBooking(bookingRequest);
      if (response.success) {
        navigate(`/booking-success/${response.data.id}`);
      } else {
        setError(response.message || 'Không thể đặt vé');
      }
    } catch (err) {
      setError('Đã xảy ra lỗi khi đặt vé');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
        <p className="text-gray-600">Đang tải thông tin đặt vé...</p>
      </div>
    );
  }

  if (error && !showtime) {
    return (
      <ErrorMessage
        message={error}
        title="Lỗi tải dữ liệu"
        onRetry={loadShowtimeData}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        {/* Movie Info Header */}
        {showtime && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Đặt vé xem phim
            </h1>
            <h2 className="text-xl text-blue-600 font-semibold">
              {showtime.theaterName} - Phòng {showtime.screenNumber}
            </h2>
            <p className="text-gray-600">
              {new Date(showtime.showDate).toLocaleDateString('vi-VN')} - {showtime.showTime}
            </p>
          </div>
        )}

        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  index <= activeStep 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {index < activeStep ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  index <= activeStep ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {step}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    index < activeStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              <span className="text-red-800">{error}</span>
            </div>
          </div>
        )}

        {/* Step Content */}
        {activeStep === 0 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Chọn ghế ngồi
            </h3>
            <SeatMap
              seats={seats}
              selectedSeats={selectedSeats}
              onSeatSelect={handleSeatSelect}
            />
          </div>
        )}

        {activeStep === 1 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Thông tin khách hàng
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và tên *
                </label>
                <input
                  type="text"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại *
                </label>
                <input
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tuổi (tùy chọn)
                </label>
                <input
                  type="number"
                  value={customerInfo.age || ''}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, age: parseInt(e.target.value) || undefined }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Thanh toán
            </h3>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Thông tin đặt vé
              </h4>
              <div className="space-y-2 mb-4">
                <p className="text-gray-700">
                  <span className="font-medium">Ghế đã chọn:</span> {selectedSeats.join(', ')}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Số lượng:</span> {selectedSeats.length} ghế
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Tổng tiền:</span> {calculateTotal().toLocaleString('vi-VN')} VNĐ
                </p>
              </div>
              <hr className="border-gray-200 my-4" />
              <p className="text-sm text-gray-600">
                Vui lòng kiểm tra thông tin trước khi xác nhận đặt vé
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handleBack}
            disabled={activeStep === 0}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeStep === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Quay lại
          </button>
          
          {activeStep === steps.length - 1 ? (
            <button
              onClick={handleBooking}
              disabled={bookingLoading}
              className={`flex items-center px-6 py-2 rounded-lg transition-colors ${
                bookingLoading
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white`}
            >
              {bookingLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Đang đặt vé...
                </>
              ) : (
                'Xác nhận đặt vé'
              )}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Tiếp tục
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
