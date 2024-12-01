const express = require('express');
const router = express.Router();
const prizeController = require('../controllers/prize.controllers');

// Получить все призы
router.get('/prizes', prizeController.getPrizes);

// Создать новый приз
router.post('/prizes', prizeController.createPrize);

// Получить приз по ID
router.get('/prizes/:id', prizeController.getOnePrize);

// Обновить приз по ID
router.put('/prizes/:id', prizeController.updatePrize);

// Удалить приз по ID
router.delete('/prizes/:id', prizeController.deletePrize);

module.exports = router;
