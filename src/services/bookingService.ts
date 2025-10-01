import { apiClient } from './api';
import type { 
  Booking, 
  BookingRequest, 
  BookingFilter,
  BookingSummary,
  Seat,
  ApiResponse, 
  PaginatedResponse 
} from '../types';

export class BookingService {
  static async createBooking(bookingData: BookingRequest): Promise<ApiResponse<Booking>> {
    return apiClient.post<Booking>('/bookings', bookingData);
  }

  static async getBookings(filters?: BookingFilter): Promise<PaginatedResponse<Booking>> {
    return apiClient.get<Booking[]>('/bookings', filters) as Promise<PaginatedResponse<Booking>>;
  }

  static async getBookingById(id: string): Promise<ApiResponse<Booking>> {
    return apiClient.get<Booking>(`/bookings/${id}`);
  }

  static async getBookingByNumber(bookingNumber: string): Promise<ApiResponse<Booking>> {
    return apiClient.get<Booking>(`/bookings/number/${bookingNumber}`);
  }

  static async cancelBooking(id: string, reason?: string): Promise<ApiResponse<Booking>> {
    return apiClient.put<Booking>(`/bookings/${id}/cancel`, { reason });
  }

  static async getAvailableSeats(showtimeId: string): Promise<ApiResponse<Seat[]>> {
    return apiClient.get<Seat[]>(`/showtimes/${showtimeId}/seats`);
  }

  static async holdSeats(showtimeId: string, seatIds: string[]): Promise<ApiResponse<{ holdId: string; expiresAt: string }>> {
    return apiClient.post<{ holdId: string; expiresAt: string }>(`/showtimes/${showtimeId}/hold-seats`, { seatIds });
  }

  static async releaseSeats(holdId: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/seat-holds/${holdId}`);
  }

  static async confirmPayment(bookingId: string, paymentData: any): Promise<ApiResponse<Booking>> {
    return apiClient.post<Booking>(`/bookings/${bookingId}/confirm-payment`, paymentData);
  }

  static async getBookingSummary(dateFrom?: string, dateTo?: string): Promise<ApiResponse<BookingSummary>> {
    const params = { dateFrom, dateTo };
    return apiClient.get<BookingSummary>('/bookings/summary', params);
  }

  static async downloadTicket(bookingId: string): Promise<Blob> {
    const response = await fetch(`${import.meta.env.REACT_APP_API_BASE_URL}/bookings/${bookingId}/ticket`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
    return response.blob();
  }

  static async sendTicketEmail(bookingId: string): Promise<ApiResponse<void>> {
    return apiClient.post<void>(`/bookings/${bookingId}/send-ticket`);
  }
}

export default BookingService;
