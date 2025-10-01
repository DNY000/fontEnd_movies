import { apiClient } from './api';
import type { 
  Movie, 
  MovieShowtime, 
  Theater, 
  ApiResponse, 
  PaginatedResponse,
  MovieSearchParams 
} from '../types';

export class MovieService {
  static async getMovies(params?: MovieSearchParams): Promise<PaginatedResponse<Movie>> {
    return apiClient.get<Movie[]>('/movies', params);
  }

  static async getMovieById(id: string): Promise<ApiResponse<Movie>> {
    return apiClient.get<Movie>(`/movies/${id}`);
  }

  static async getMovieShowtimes(movieId: string, date?: string): Promise<ApiResponse<MovieShowtime[]>> {
    const params = date ? { date } : {};
    return apiClient.get<MovieShowtime[]>(`/movies/${movieId}/showtimes`, params);
  }

  static async getShowtimeById(showtimeId: string): Promise<ApiResponse<MovieShowtime>> {
    return apiClient.get<MovieShowtime>(`/showtimes/${showtimeId}`);
  }

  static async getTheaters(): Promise<ApiResponse<Theater[]>> {
    return apiClient.get<Theater[]>('/theaters');
  }

  static async getTheaterById(id: string): Promise<ApiResponse<Theater>> {
    return apiClient.get<Theater>(`/theaters/${id}`);
  }

  static async searchMovies(query: string, filters?: MovieSearchParams): Promise<PaginatedResponse<Movie>> {
    return apiClient.get<Movie[]>('/movies/search', { query, ...filters });
  }

  static async getPopularMovies(limit: number = 10): Promise<ApiResponse<Movie[]>> {
    return apiClient.get<Movie[]>('/movies/popular', { limit });
  }

  static async getUpcomingMovies(limit: number = 10): Promise<ApiResponse<Movie[]>> {
    return apiClient.get<Movie[]>('/movies/upcoming', { limit });
  }

  static async getNowShowingMovies(limit?: number): Promise<ApiResponse<Movie[]>> {
    const params = limit ? { limit } : {};
    return apiClient.get<Movie[]>('/movies/now-showing', params);
  }
}

export default MovieService;
