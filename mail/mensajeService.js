import axios from 'axios';

// Function to fetch data outside React components
export async function fetchMessages(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error details:', error.response ? error.response.data : error.message);
    throw new Error('Error al obtener los datos');
  }
}