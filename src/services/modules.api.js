import axios from 'axios';

const API_URL = 'http://localhost:3000/modules';

export const getDBModules = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener módulos:', error);
    throw error;
  }
};
