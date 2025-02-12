const express = require('express');
const router = express.Router();
const userController = require('../controllers/user/userController');

// Registro de administrador
router.post('/register', userController.createUserWithRelations);

router.post('/register-admin', userController.createAdminWithRelations);

// Inicio de sesión de administrador
router.post('/login', userController.loginUser);

router.get('/all', userController.getAllUsers)

router.get("/:id",userController.getUserById);

router.delete('/delete/:id', userController.deleteUser)

router.post("/update/:id", userController.updateUser);

module.exports = router;