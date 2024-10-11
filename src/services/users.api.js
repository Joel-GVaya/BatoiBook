import axios from 'axios';

const API_URL = 'http://localhost:3000/users';

export const getDBUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};

export const getDBUser = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el usuario con ID ${id}:`, error);
    throw error;
  }
};

export const addDBUser = async (newUser) => {
  try {
    const response = await axios.post(API_URL, newUser);
    return response.data;
  } catch (error) {
    console.error('Error al añadir el usuario:', error);
    throw error;
  }
};

export const removeDBUser = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Error al eliminar el usuario con ID ${id}:`, error);
    throw error;
  }
};

export const changeDBUser = async (updatedUser) => {
  try {
    const response = await axios.put(`${API_URL}/${updatedUser.id}`, updatedUser);
    return response.data;
  } catch (error) {
    console.error('Error al modificar el usuario:', error);
    throw error;
  }
};

export const changeDBUserPassword = async (id, newPassword) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, { password: newPassword });
    return response.data;
  } catch (error) {
    console.error(`Error al cambiar la contraseña del usuario con ID ${id}:`, error);
    throw error;
  }
};
