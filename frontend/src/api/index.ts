import axios from 'axios';


const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1'
})

api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('token');
    
    if (!config.headers) {
        config.headers = {}
    }

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    
    return config;
})

export default api;