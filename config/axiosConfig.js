import axios from 'axios';
const dotenv = require("dotenv");
dotenv.config({
    path: process.env.NODE_ENV === "production" ? ".env.production" : ".env.development",
  });

const instance = axios.create({
    baseURL: process.env.API_URL || 'http://localhost:5000', // Cambia al puerto de tu backend
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;
