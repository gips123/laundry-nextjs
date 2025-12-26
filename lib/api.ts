// API Client for LaundryHub Backend using Axios

import axios, { AxiosInstance, AxiosError } from 'axios';

// Get API URL from environment variables
// Must be set in .env.local or .env file
// For Next.js, environment variables that start with NEXT_PUBLIC_ are exposed to the browser
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  if (process.env.NODE_ENV === 'development') {
    console.warn(
      '⚠️  NEXT_PUBLIC_API_URL is not defined. Please create .env.local file with:\n' +
      'NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1'
    );
  }
  throw new Error(
    'NEXT_PUBLIC_API_URL is not defined. Please set it in your .env.local file.\n' +
    'Example: NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1'
  );
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000', 10), // Default 10 seconds
});

// Request interceptor - Add token to headers
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('laundryhub_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      // Server responded with error status
      const data = error.response.data as any;
      return Promise.reject({
        success: false,
        error: data?.error || `HTTP ${error.response.status}: ${error.response.statusText}`,
      });
    } else if (error.request) {
      // Request made but no response received
      return Promise.reject({
        success: false,
        error: 'Network error - No response from server',
      });
    } else {
      // Something else happened
      return Promise.reject({
        success: false,
        error: error.message || 'An error occurred',
      });
    }
  }
);

// Helper function untuk membuat request
async function apiRequest<T>(
  endpoint: string,
  options: {
    method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
    data?: any;
    params?: any;
  } = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await apiClient.request({
      url: endpoint,
      method: options.method || 'GET',
      data: options.data,
      params: options.params,
    });

    return response.data;
  } catch (error: any) {
    // Error sudah di-handle oleh interceptor
    return error;
  }
}

// Auth API
export const authApi = {
  register: async (data: {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    latitude?: number;
    longitude?: number;
    role?: string;
  }) => {
    return apiRequest<{
      user: any;
      token: string;
    }>('/auth/register', {
      method: 'POST',
      data,
    });
  },

  login: async (email: string, password: string) => {
    return apiRequest<{
      user: any;
      token: string;
    }>('/auth/login', {
      method: 'POST',
      data: { email, password },
    });
  },

  getMe: async () => {
    return apiRequest<any>('/auth/me');
  },

  updateLocation: async (latitude: number, longitude: number) => {
    // Validate latitude and longitude
    if (latitude < -90 || latitude > 90) {
      return {
        success: false,
        error: 'Latitude must be between -90 and 90',
      };
    }
    if (longitude < -180 || longitude > 180) {
      return {
        success: false,
        error: 'Longitude must be between -180 and 180',
      };
    }

    return apiRequest<{
      id: string;
      latitude: number;
      longitude: number;
    }>('/auth/update-location', {
      method: 'PATCH',
      data: { latitude, longitude },
    });
  },
};

// Laundry API
export const laundryApi = {
  getAll: async (params?: {
    search?: string;
    is_open?: boolean;
    page?: number;
    limit?: number;
    lat?: number;
    lng?: number;
    sort_by?: 'distance' | 'rating';
  }) => {
    return apiRequest<{
      laundries: any[];
      pagination: Pagination;
      user_location?: { latitude: number; longitude: number };
    }>('/laundries', {
      method: 'GET',
      params,
    });
  },

  getById: async (id: string, params?: { lat?: number; lng?: number }) => {
    return apiRequest<any>(`/laundries/${id}`, {
      method: 'GET',
      params,
    });
  },
};

// Order API
export const orderApi = {
  create: async (data: {
    laundry_id: string;
    services: Array<{ service_id: string; quantity: number }>;
    delivery_address: string;
    notes?: string;
    estimated_pickup_at?: string;
  }) => {
    return apiRequest<any>('/orders', {
      method: 'POST',
      data,
    });
  },

  getAll: async (params?: {
    status?: string;
    page?: number;
    limit?: number;
  }) => {
    return apiRequest<{
      orders: any[];
      pagination: Pagination;
    }>('/orders', {
      method: 'GET',
      params,
    });
  },

  getById: async (id: string) => {
    return apiRequest<any>(`/orders/${id}`);
  },

  cancel: async (id: string) => {
    return apiRequest<any>(`/orders/${id}/cancel`, {
      method: 'PATCH',
    });
  },
};

