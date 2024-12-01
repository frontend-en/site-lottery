const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controllers');

// Получить всех пользователей
router.get('/user', userController.getUsers);

// Создать нового пользователя
router.post('/user', userController.createUser);

// Получить пользователя по ID
router.get('/user/:id', userController.getOneUser);

// // Обновить пользователя по ID
router.put('/user/:id', userController.updateUser);

// // Удалить пользователя по ID
router.delete('/user/:id', userController.deleteUser);

module.exports = router;
