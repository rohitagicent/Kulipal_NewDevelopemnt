import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Replace with your actual API base URL
const BASE_URL = 'https://your-api-url.com/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the token to all requests
api.interceptors.request.use(
  async (config) => {
    // Get the token from AsyncStorage
    const token = await AsyncStorage.getItem('authToken');
    
    // If token exists, add it to the headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Handle token expiration
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Here you can implement token refresh logic if needed
        // For now, we'll just log the user out
        await AsyncStorage.removeItem('authToken');
        // Redirect to login (you would need to implement this)
      } catch (refreshError) {
        console.log('Error refreshing token', refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;