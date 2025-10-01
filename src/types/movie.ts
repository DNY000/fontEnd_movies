export interface Movie {
  id: string;
  title: string;
  description: string;
  poster: string;
  backdrop?: string;
  genre: string[];
  duration: number; // in minutes
  rating: number; // 0-10
  releaseDate: string;
  director: string;
  cast: string[];
  language: string;
  country: string;
  price: number;
  status: 'now_showing' | 'coming_soon' | 'ended';
  trailerUrl?: string;
}

export interface MovieShowtime {
  id: string;
  movieId: string;
  theaterId: string;
  theaterName: string;
  screenNumber: number;
  showDate: string;
  showTime: string;
  availableSeats: number;
  totalSeats: number;
  price: number;
}

export interface Theater {
  id: string;
  name: string;
  address: string;
  city: string;
  screens: Screen[];
}

export interface Screen {
  id: string;
  screenNumber: number;
  totalSeats: number;
  seatLayout: SeatLayout;
}

export interface SeatLayout {
  rows: number;
  seatsPerRow: number;
  seats: Seat[][];
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  type: 'regular' | 'premium' | 'vip';
  status: 'available' | 'occupied' | 'selected' | 'blocked';
  price: number;
}
