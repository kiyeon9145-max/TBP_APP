import axios, { AxiosError, AxiosInstance } from 'axios';

// Error response normalization (추후 확장 예정)
interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

// Axios instance 생성
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor (추후 구현)
apiClient.interceptors.request.use(
  (config) => {
    // TODO: 인증 토큰 추가 (Backend 인증 방식 확정 후)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor (추후 구현)
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // TODO: 에러 정규화 (API 계약 확정 후)
    return Promise.reject(error);
  }
);

export default apiClient;
export type { ApiError };
