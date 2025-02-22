const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Ruta para iniciar la autenticación con Google
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback URL para Google
router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    // Generar JWT token
    const token = jwt.sign(
      { 
        id: req.user.id,
        email: req.user.email 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Redirigir al frontend con el token
    res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${token}`);
  }
);

// Ruta para verificar el estado de autenticación
router.get('/verify', 
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ user: req.user });
  }
);

module.exports = router;
