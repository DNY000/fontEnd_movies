import type { Movie, MovieShowtime, Seat } from '../types';

export const mockMovies: Movie[] = [
  {
    id: '1',
    title: 'Avatar: The Way of Water',
    description: 'Bộ phim khoa học viễn tưởng hành động của đạo diễn James Cameron, là phần tiếp theo của Avatar (2009).',
    poster: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg',
    genre: ['Khoa học viễn tưởng', 'Hành động', 'Phiêu lưu'],
    duration: 192,
    rating: 8.5,
    releaseDate: '2022-12-16',
    director: 'James Cameron',
    cast: ['Sam Worthington', 'Zoe Saldana', 'Sigourney Weaver'],
    language: 'Tiếng Anh',
    country: 'Mỹ',
    price: 120000,
    status: 'now_showing',
    trailerUrl: 'https://www.youtube.com/watch?v=d9MyW72ELq0'
  },
  {
    id: '2',
    title: 'Black Panther: Wakanda Forever',
    description: 'Nữ hoàng Ramonda, Shuri, M\'Baku, Okoye và Dora Milaje chiến đấu để bảo vệ đất nước của họ.',
    poster: 'https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg',
    genre: ['Hành động', 'Phiêu lưu', 'Khoa học viễn tưởng'],
    duration: 161,
    rating: 7.8,
    releaseDate: '2022-11-11',
    director: 'Ryan Coogler',
    cast: ['Letitia Wright', 'Angela Bassett', 'Tenoch Huerta'],
    language: 'Tiếng Anh',
    country: 'Mỹ',
    price: 110000,
    status: 'now_showing'
  },
  {
    id: '3',
    title: 'Top Gun: Maverick',
    description: 'Sau hơn ba thập kỷ phục vụ như một trong những phi công hàng đầu của Hải quân.',
    poster: 'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg',
    genre: ['Hành động', 'Chính kịch'],
    duration: 130,
    rating: 9.2,
    releaseDate: '2022-05-27',
    director: 'Joseph Kosinski',
    cast: ['Tom Cruise', 'Miles Teller', 'Jennifer Connelly'],
    language: 'Tiếng Anh',
    country: 'Mỹ',
    price: 100000,
    status: 'now_showing'
  }
];

export const mockShowtimes: MovieShowtime[] = [
  {
    id: 'st1',
    movieId: '1',
    theaterId: 'th1',
    theaterName: 'CGV Vincom Center',
    screenNumber: 1,
    showDate: '2024-10-01',
    showTime: '14:00',
    availableSeats: 45,
    totalSeats: 60,
    price: 120000
  },
  {
    id: 'st2',
    movieId: '1',
    theaterId: 'th1',
    theaterName: 'CGV Vincom Center',
    screenNumber: 2,
    showDate: '2024-10-01',
    showTime: '17:30',
    availableSeats: 38,
    totalSeats: 60,
    price: 120000
  },
  {
    id: 'st3',
    movieId: '1',
    theaterId: 'th2',
    theaterName: 'Lotte Cinema',
    screenNumber: 1,
    showDate: '2024-10-01',
    showTime: '20:00',
    availableSeats: 52,
    totalSeats: 80,
    price: 130000
  }
];

export const generateMockSeats = (rows: number = 8, seatsPerRow: number = 10): Seat[] => {
  const seats: Seat[] = [];
  const rowLabels = 'ABCDEFGHIJ'.split('');
  
  for (let row = 0; row < rows; row++) {
    for (let seat = 1; seat <= seatsPerRow; seat++) {
      const seatId = `${rowLabels[row]}${seat}`;
      const isOccupied = Math.random() < 0.3; // 30% chance of being occupied
      
      seats.push({
        id: seatId,
        row: rowLabels[row],
        number: seat,
        type: seat <= 2 || seat >= seatsPerRow - 1 ? 'regular' : 'premium',
        status: isOccupied ? 'occupied' : 'available',
        price: seat <= 2 || seat >= seatsPerRow - 1 ? 100000 : 120000
      });
    }
  }
  
  return seats;
};
