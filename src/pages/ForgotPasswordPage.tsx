import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import AuthService from '../services/authService';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate email
      if (!email.trim()) {
        setError('Vui lòng nhập email');
        return;
      }

      if (!/\S+@\S+\.\S+/.test(email)) {
        setError('Email không hợp lệ');
        return;
      }

      // Gọi API forgot password thực tế
      const response = await AuthService.forgotPassword({ email });

      if (response.success) {
        setSuccess(true);
      } else {
        setError(response.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
      }
    } catch (err: any) {
      console.error('Forgot password error:', err);
      if (err.response?.status === 404) {
        setError('Email không tồn tại trong hệ thống');
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Không thể kết nối đến server. Vui lòng thử lại.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center">
              <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
              <h2 className="mt-6 text-2xl font-bold text-gray-900">
                Email đã được gửi!
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến email:
              </p>
              <p className="mt-1 text-sm font-medium text-blue-600">
                {email}
              </p>
              <p className="mt-4 text-sm text-gray-600">
                Vui lòng kiểm tra hộp thư (bao gồm cả thư mục spam) và làm theo hướng dẫn để đặt lại mật khẩu.
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <button
                onClick={() => {
                  setSuccess(false);
                  setEmail('');
                }}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Gửi lại email
              </button>
              
              <Link
                to="/login"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Quay lại đăng nhập
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Quên mật khẩu?
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Nhập email của bạn và chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="text-sm text-red-600">{error}</div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nhập email của bạn"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  loading
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                    Đang gửi email...
                  </>
                ) : (
                  'Gửi hướng dẫn đặt lại mật khẩu'
                )}
              </button>
            </div>

            <div className="text-center">
              <Link
                to="/login"
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Quay lại đăng nhập
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
