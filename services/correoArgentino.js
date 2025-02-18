const axios = require('axios');

// Importa las variables de entorno (asegúrate de configurarlas en un archivo .env)
require('dotenv').config();
const { URL_CA, USERNAME_CA, PASSWORD_CA } = process.env;

// Variable para almacenar el token de autenticación
let authToken;

// Función para obtener el token (se llama una sola vez al iniciar el servidor)
async function getAuthToken() {
    try {
        const response = await axios.post(`${URL_CA}/token`, {}, {
            auth: { username: USERNAME_CA, password: PASSWORD_CA },
        });
        authToken = response.data.token;
        return authToken;
    } catch (error) {
        console.error("Error obteniendo token:", error);
        throw error; // Re-lanza el error para que se maneje en otro lugar
    }
}

// Obtener el token al iniciar el servidor
getAuthToken().catch(err => {
    console.error("No se pudo obtener el token. El servicio de cotización no estará disponible.", err);
});

module.exports = {
    async getRates(requestBody) {
        try {
            const response = await axios.post(`${URL_CA}/rates`, requestBody, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error en getRates:', error);
            throw error; // Re-lanza el error para que se maneje en el controlador
        }
    },
    // ... (otras funciones para interactuar con la API de Correo Argentino)
};