import axios from 'axios';

const API_URL = 'http://localhost:5000/api';
export const IMAGE_BASE_URL = 'http://localhost:5000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const productAPI = {
    getAll: () => api.get('/products'),
    getFeatured: () => api.get('/products').then(res => ({
        ...res,
        data: res.data.filter((p: any) => p.isFeatured)
    })),
};

export const categoryAPI = {
    getAll: () => api.get('/categories'),
};

export const bannerAPI = {
    getAll: () => api.get('/banners'),
};

export const authAPI = {
    login: (data: any) => api.post('/auth/login', data),
    register: (data: any) => api.post('/auth/register', data),
};

export const orderAPI = {
    getAll: () => api.get('/orders'),
    create: (data: any) => api.post('/orders', data),
};

export const userAPI = {
    getAll: () => api.get('/users'),
};

export default api;

