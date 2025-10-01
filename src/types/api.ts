export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  message?: string;
}

export interface ApiError {
  message: string;
  code: string;
  details?: any;
}

export interface SearchParams {
  query?: string;
  genre?: string;
  language?: string;
  rating?: number;
  sortBy?: 'title' | 'rating' | 'releaseDate' | 'popularity';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface MovieSearchParams extends SearchParams {
  status?: 'now_showing' | 'coming_soon' | 'ended';
  city?: string;
  dateFrom?: string;
  dateTo?: string;
}
