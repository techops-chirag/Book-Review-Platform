// File: frontend/src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

// Create a new Axios instance.
const api = axios.create({
    baseURL: API_URL,
});

// --- Axios Request Interceptor ---
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        
        console.log("Sending request with headers:", config.headers);
        console.log("Request URL:", config.url);
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// --- Axios Response Interceptor ---
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            // Token is invalid or expired
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            window.location.href = '/auth';
        }
        return Promise.reject(error);
    }
);

export const signup = (userData) => api.post('/auth/signup', userData);
export const login = (userData) => api.post('/auth/login', userData);
export const getBooks = (params) => api.get('/books', { params });
export const getBookById = (id) => api.get(`/books/${id}`);
export const addBook = (bookData) => api.post('/books', bookData);
export const addReview = (bookId, reviewData) => api.post(`/books/${bookId}/reviews`, reviewData);

export default api;
