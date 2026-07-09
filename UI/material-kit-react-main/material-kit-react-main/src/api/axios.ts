import axios from 'axios';
import i18n from 'src/i18n';

const api = axios.create({
  baseURL: 'http://localhost:8081/auth',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Separate instance for refresh
const refreshApi = axios.create({
  baseURL: 'http://localhost:8081/auth',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers['Accept-Language'] = i18n.language;

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const isAuthError = error.response?.status === 401 || error.response?.status === 403;

    const isLoginRequest = originalRequest.url?.includes('/v1/login');
    const isRefreshRequest = originalRequest.url?.includes('/v1/refresh');

    if (isAuthError && !isLoginRequest && !isRefreshRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        console.log('Refreshing access token...');

        const response = await refreshApi.post('/v1/refresh', {
          refreshToken,
          role: localStorage.getItem('role'),
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        console.log('New access token:', accessToken);

        localStorage.setItem('accessToken', accessToken);

        if (newRefreshToken) {
          localStorage.setItem('refreshToken', newRefreshToken);
        }

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${accessToken}`,
        };

        console.log('Retrying:', originalRequest.url);

        return api(originalRequest);
      } catch (refreshError) {
        console.error('Refresh failed:', refreshError);

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        //window.location.href = '/sign-in?reason=session_expired';

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
