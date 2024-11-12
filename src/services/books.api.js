import axios from 'axios';

const API_URL = 'http://localhost:3000/books';

export const getDBBooks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener libros:', error);
    throw error;
  }
};

export const getDBBook = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el libro con ID ${id}:`, error);
    throw error;
  }
};

export const addDBBook = async (newBook) => {
  try {
    const response = await axios.post(API_URL, newBook);
    return response.data;
  } catch (error) {
    console.error('Error al añadir el libro:', error);
    throw error;
  }
};

export const removeDBBook = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Error al eliminar el libro con ID ${id}:`, error);
    throw error;
  }
};

export const changeDBBook = async (updatedBook) => {
  try {
    const response = await axios.put(`${API_URL}/${updatedBook.id}`, updatedBook);
    return response.data;
  } catch (error) {
    console.error('Error al modificar el libro:', error);
    throw error;
  }
};

export const getModuleUsed = async (userId, moduleCode) => {
  try {
    const response = await axios.get(`${API_URL}?userId=${userId}&moduleCode=${moduleCode}`);
    return response.data.length > 0;
  } catch (error) {
    console.error(`Error al verificar si el módulo con userId ${userId} y moduleCode ${moduleCode} está en uso:`, error);
    throw error;
  }
}
