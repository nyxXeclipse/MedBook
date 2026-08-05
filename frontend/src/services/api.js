import axios from 'axios';

// Base API setup pointing to Express backend
const API = axios.create({
  baseURL: 'https://medbook-backend-87qe.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export default API;
