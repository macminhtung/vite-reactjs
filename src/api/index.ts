import axios from 'axios';

console.log('VITE_BACKEND_API_URL =', import.meta.env.VITE_BACKEND_API_URL);

export const APIService = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const API_MODULE = {
  AUTH: 'auth',
  USER: 'user',
};
