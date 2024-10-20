import axios from 'axios';

// URL du backend hébergé sur Render
const API_URL = 'https://projet-react-cv-dev.onrender.com/api';

// Configuration de l'instance axios avec l'URL de base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
