import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api/auth',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token to every request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email: string, password: string) => {
  const res = await API.post('/login', { email, password });
  return res.data;
};

export const register = async (data: {
  fullName: string;
  email: string;
  password: string;
  role: string;
}) => {
  const res = await API.post('/register', data);
  return res.data;
};

export default API;
