import type{ Movie, MovieShowtime, Seat } from './movie';

export interface BookingRequest {
  showtimeId: string;
  selectedSeats: string[];
  customerInfo: CustomerInfo;
  paymentMethod: PaymentMethod;
}

export interface Booking {
  id: string;
  bookingNumber: string;
  movie: Movie;
  showtime: MovieShowtime;
  seats: Seat[];
  customer: CustomerInfo;
  totalAmount: number;
  bookingDate: string;
  status: BookingStatus;
  paymentInfo: PaymentInfo;
  qrCode?: string;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  age?: number;
}

export interface PaymentMethod {
  type: 'credit_card' | 'debit_card' | 'digital_wallet' | 'bank_transfer';
  details: PaymentDetails;
}

export interface PaymentDetails {
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardholderName?: string;
  walletId?: string;
  bankAccount?: string;
}

export interface PaymentInfo {
  transactionId: string;
  paymentMethod: PaymentMethod;
  amount: number;
  currency: string;
  paymentDate: string;
  status: PaymentStatus;
}

export type BookingStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'cancelled' 
  | 'completed' 
  | 'refunded';

export type PaymentStatus = 
  | 'pending' 
  | 'processing' 
  | 'completed' 
  | 'failed' 
  | 'refunded';

export interface BookingFilter {
  status?: BookingStatus;
  dateFrom?: string;
  dateTo?: string;
  movieId?: string;
  customerId?: string;
}

export interface BookingSummary {
  totalBookings: number;
  totalRevenue: number;
  todayBookings: number;
  todayRevenue: number;
  popularMovies: { movieId: string; title: string; bookings: number }[];
}
