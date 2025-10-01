import React, { useState } from 'react';
import { 
  MapPin, Phone, Mail, Clock, Send, MessageCircle, 
  Facebook, Instagram, Twitter, Youtube, Star, 
  CheckCircle, AlertCircle, User, MessageSquare
} from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Địa chỉ',
      content: '123 Nguyễn Huệ, Quận 1, TP.HCM',
      subContent: 'Tầng 10, Tòa nhà Vincom Center',
      color: 'text-red-500'
    },
    {
      icon: Phone,
      title: 'Hotline',
      content: '1900 1234',
      subContent: 'Miễn phí từ 8:00 - 22:00',
      color: 'text-green-500'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'support@cinemabooking.vn',
      subContent: 'Phản hồi trong 24h',
      color: 'text-blue-500'
    },
    {
      icon: Clock,
      title: 'Giờ làm việc',
      content: '8:00 - 22:00',
      subContent: 'Thứ 2 - Chủ nhật',
      color: 'text-purple-500'
    }
  ];

  const socialLinks = [
    { icon: Facebook, name: 'Facebook', url: '#', color: 'hover:text-blue-600' },
    { icon: Instagram, name: 'Instagram', url: '#', color: 'hover:text-pink-600' },
    { icon: Twitter, name: 'Twitter', url: '#', color: 'hover:text-blue-400' },
    { icon: Youtube, name: 'Youtube', url: '#', color: 'hover:text-red-600' }
  ];

  const categories = [
    { value: 'general', label: 'Câu hỏi chung' },
    { value: 'booking', label: 'Đặt vé & Thanh toán' },
    { value: 'technical', label: 'Hỗ trợ kỹ thuật' },
    { value: 'complaint', label: 'Khiếu nại' },
    { value: 'suggestion', label: 'Góp ý' },
    { value: 'partnership', label: 'Hợp tác kinh doanh' }
  ];

  const faqItems = [
    {
      question: 'Làm thế nào để đặt vé xem phim?',
      answer: 'Bạn có thể đặt vé trực tuyến qua website hoặc app mobile. Chọn phim, suất chiếu, ghế ngồi và thanh toán online.'
    },
    {
      question: 'Tôi có thể hủy vé đã đặt không?',
      answer: 'Có, bạn có thể hủy vé trước giờ chiếu ít nhất 2 tiếng. Phí hủy vé là 10% giá trị vé.'
    },
    {
      question: 'Các hình thức thanh toán nào được chấp nhận?',
      answer: 'Chúng tôi chấp nhận thanh toán qua thẻ ATM, thẻ tín dụng, ví điện tử (MoMo, ZaloPay) và chuyển khoản ngân hàng.'
    },
    {
      question: 'Làm sao để trở thành thành viên VIP?',
      answer: 'Đăng ký tài khoản và tích lũy điểm qua việc xem phim. Thành viên VIP được nhiều ưu đãi đặc biệt.'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        category: 'general'
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Liên hệ với chúng tôi</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy liên hệ với chúng tôi qua các kênh dưới đây.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 text-center hover:border-gray-600/50 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-700/50 mb-4`}>
                  <Icon className={`h-8 w-8 ${info.color}`} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{info.title}</h3>
                <p className="text-white font-medium mb-1">{info.content}</p>
                <p className="text-gray-400 text-sm">{info.subContent}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
            <div className="flex items-center mb-6">
              <MessageCircle className="h-6 w-6 text-red-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">Gửi tin nhắn</h2>
            </div>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center">
                <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                <p className="text-green-400">Tin nhắn đã được gửi thành công! Chúng tôi sẽ phản hồi sớm nhất.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center">
                <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
                <p className="text-red-400">Có lỗi xảy ra. Vui lòng thử lại sau.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <User className="h-4 w-4 inline mr-2" />
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Nhập họ và tên"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Mail className="h-4 w-4 inline mr-2" />
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Nhập email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Phone className="h-4 w-4 inline mr-2" />
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Nhập số điện thoại"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Danh mục
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <MessageSquare className="h-4 w-4 inline mr-2" />
                  Tiêu đề *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Nhập tiêu đề tin nhắn"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nội dung *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                  placeholder="Nhập nội dung tin nhắn..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center px-6 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                  isSubmitting
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white transform hover:scale-105 shadow-lg hover:shadow-red-500/25'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Đang gửi...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-3" />
                    Gửi tin nhắn
                  </>
                )}
              </button>
            </form>
          </div>

          {/* FAQ & Additional Info */}
          <div className="space-y-8">
            {/* FAQ */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Câu hỏi thường gặp</h2>
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="border-b border-gray-700/50 pb-4 last:border-b-0">
                    <h3 className="text-white font-semibold mb-2 flex items-start">
                      <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full mr-3 mt-0.5 flex-shrink-0">
                        Q{index + 1}
                      </span>
                      {item.question}
                    </h3>
                    <p className="text-gray-400 ml-8">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Kết nối với chúng tôi</h2>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      className={`flex items-center p-4 bg-gray-700/30 hover:bg-gray-600/30 rounded-lg transition-all duration-300 text-gray-300 ${social.color}`}
                    >
                      <Icon className="h-6 w-6 mr-3" />
                      <span className="font-medium">{social.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Customer Reviews */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Khách hàng nói gì</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-700/30 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-white font-semibold">Nguyễn Văn A</span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    "Dịch vụ tuyệt vời! Đặt vé dễ dàng, hỗ trợ khách hàng nhiệt tình."
                  </p>
                </div>
                
                <div className="p-4 bg-gray-700/30 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-white font-semibold">Trần Thị B</span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    "App rất tiện lợi, giao diện đẹp. Rất hài lòng với trải nghiệm."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Vị trí của chúng tôi</h2>
          <div className="bg-gray-700/50 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <p className="text-white font-semibold">Bản đồ tương tác</p>
              <p className="text-gray-400 text-sm">123 Nguyễn Huệ, Quận 1, TP.HCM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
