import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5001/api',
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth
export const signup = (userData) => api.post('/auth/signup', userData);
export const login = (userData) => api.post('/auth/login', userData);

// Books
export const getBooks = (params) => api.get('/books', { params });
export const getBookById = (id) => api.get(`/books/${id}`);
export const addBook = (bookData) => api.post('/books', bookData);

// Reviews
export const addReview = (bookId, reviewData) => api.post(`/books/${bookId}/reviews`, reviewData);

export default api;