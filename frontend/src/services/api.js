import axios from 'axios';

const API_URL = 'http://localhost:3001'; // URL do seu JSON Server

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getLivros = () => apiClient.get('/livros');
export const addLivro = (livroData) => apiClient.post('/livros', livroData);
export const updateLivro = (id, livroData) => apiClient.patch(`/livros/${id}`, livroData);
export const deleteLivro = (id) => apiClient.delete(`/livros/${id}`);