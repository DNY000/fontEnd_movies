import { apiClient } from './api';
import type { ApiResponse } from '../types';

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
  };
  token: string;
  refreshToken?: string;
}

export class AuthService {
  // Đăng nhập
  static async login(data: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    return apiClient.post<AuthResponse>('/auth/login', data);
  }

  // Đăng ký
  static async register(data: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    return apiClient.post<AuthResponse>('/auth/register', data);
  }

  // Quên mật khẩu
  static async forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>('/auth/forgot-password', data);
  }

  // Đặt lại mật khẩu
  static async resetPassword(data: ResetPasswordRequest): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>('/auth/reset-password', data);
  }

  // Refresh token
  static async refreshToken(refreshToken: string): Promise<ApiResponse<{ token: string; refreshToken: string }>> {
    return apiClient.post<{ token: string; refreshToken: string }>('/auth/refresh-token', {
      refreshToken
    });
  }

  // Đăng xuất
  static async logout(): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>('/auth/logout');
  }

  // Lấy thông tin user hiện tại
  static async getCurrentUser(): Promise<ApiResponse<AuthResponse['user']>> {
    return apiClient.get<AuthResponse['user']>('/auth/me');
  }

  // Xác thực email
  static async verifyEmail(token: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>('/auth/verify-email', { token });
  }

  // Gửi lại email xác thực
  static async resendVerificationEmail(): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>('/auth/resend-verification');
  }

  // Thay đổi mật khẩu
  static async changePassword(data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }): Promise<ApiResponse<{ message: string }>> {
    return apiClient.put<{ message: string }>('/auth/change-password', data);
  }

  // Cập nhật thông tin profile
  static async updateProfile(data: {
    name?: string;
    phone?: string;
    avatar?: string;
  }): Promise<ApiResponse<AuthResponse['user']>> {
    return apiClient.put<AuthResponse['user']>('/auth/profile', data);
  }

  // Social login
  static async socialLogin(provider: 'google' | 'facebook', token: string): Promise<ApiResponse<AuthResponse>> {
    return apiClient.post<AuthResponse>(`/auth/social/${provider}`, { token });
  }

  // Kiểm tra token có hợp lệ không
  static async validateToken(): Promise<ApiResponse<{ valid: boolean }>> {
    return apiClient.get<{ valid: boolean }>('/auth/validate-token');
  }
}

export default AuthService;
