const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controllers');

// Регистрация пользователя
router.post('/auth/register', authController.register);

// Подтверждение email
router.get('/auth/confirm/:token', authController.confirmEmail);

// Логин пользователя
router.post('/auth/login', authController.login);

module.exports = router;
