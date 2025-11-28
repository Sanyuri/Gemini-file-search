import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const router = axios.create({
    baseURL: `${BASE_URL}/api`,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

export default router;