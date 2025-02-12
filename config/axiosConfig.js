import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000', // Cambia al puerto de tu backend
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;
