import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError } from 'axios';
import Config from 'react-native-config';

// Create an axios instance
const api = axios.create({
  baseURL: Config.PUBLIC_LINK,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor to add JWT
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// Response interceptor to handle 401 and refresh token
let isRefreshing = false;
let failedQueue: any = [];

const processQueue = (error: any, token = null) => {
  failedQueue.forEach((prom: any) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // If 401 and not already trying to refresh
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (
      error.response &&
      (error.response.status === 401 && accessToken != null) &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        // Queue the request until token is refreshed
        return new Promise(function (resolve, reject) {
          failedQueue.push({resolve, reject});
        })
          .then(token => {
            originalRequest.headers.Authorization = 'Bearer ' + token;
            return api(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log('Refreshing token...');
        // Call your refresh endpoint
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        const res = await axios.post(
          `${Config.PUBLIC_LINK}/api/authenticate/refresh-token`,
          {
            requestToken: refreshToken,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          },
        );
        const newAccessToken = res.data.token;
        const newRefreshToken = res.data.refreshToken;
        await AsyncStorage.setItem('refreshToken', newRefreshToken);
        await AsyncStorage.setItem('accessToken', newAccessToken);

        api.defaults.headers.common.Authorization = 'Bearer ' + newAccessToken;
        processQueue(null, newAccessToken);

        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        const error = err as AxiosError;
        console.log(error.toJSON());
        console.error('Token refresh failed:', error.message);
        // await AsyncStorage.removeItem('accessToken');
        // await AsyncStorage.removeItem('refreshToken');

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
