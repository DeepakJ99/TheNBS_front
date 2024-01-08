// src/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1'; // Replace with your backend base URL

const tokenized_api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const auth_api = axios.create({
    baseURL: `${API_BASE_URL}/auth`,
    headers: {
      'Content-Type': 'application/json',
    },
  });


tokenized_api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log(token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const register = (userData) => auth_api.post('/register', userData);
export const login = (loginData) => auth_api.post('/login', loginData);
export const refreshToken = (token) => auth_api.post('/refresh-token', token);
export const getAllParentNotes = () => tokenized_api.get('/notes')
export const getNoteByTitle = (title) => tokenized_api.get(`/notes/${title}`)
export const saveNoteByTitle = (payload) => tokenized_api.post('/notes',payload)
// Add more API functions as needed
