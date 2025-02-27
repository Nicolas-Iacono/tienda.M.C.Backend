const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('passport');
const { sequelize, Category, Product, Order, User } = require('./models');

// Configuración de Passport
require('./config/passport');

// Importar rutas
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const likeRoutes = require('./routes/likeRoutes');
const paymentRoutes = require('./routes/paymentsRoutes');
const mpRoutes = require('./routes/mpRoutes');
const authRoutes = require('./routes/authRoutes');
const instagramRoutes = require('./routes/instagramRoutes');
const blogRoutes = require('./routes/blogRoutes');

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: ['https://movimientoconsiente.com', 'https://www.movimientoconsiente.com', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());
app.use(passport.initialize());

// Middleware para logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Rutas
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de la tienda');
});

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/category', categoryRoutes);
app.use('/like', likeRoutes);
app.use('/payment', paymentRoutes);
app.use('/webhook', mpRoutes);
app.use('/auth', authRoutes);
app.use('/instagram', instagramRoutes);
app.use('/blog', blogRoutes);

// Middleware para manejo de errores
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ message: 'Error interno del servidor', error: err.message });
});

// Sincronizar base de datos y relaciones
(async () => {
  try {
    await sequelize.sync({ alter: true }); // Usa alter: true para actualizaciones menores
    console.log('Base de datos MOVIMIENTO CONCIENTE sincronizada correctamente.');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
})();

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

module.exports = app;