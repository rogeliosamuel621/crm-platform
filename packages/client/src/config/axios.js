import axios from 'axios';

export const AxiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`
  }
});
