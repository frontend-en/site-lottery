const express = require('express');
const router = express.Router();
const lotteryController = require('../controllers/lottery.controllers');

// Получить все лотереи
router.get('/lottery', lotteryController.getLotteries);

// Создать новую лотерею
router.post('/lottery', lotteryController.createLottery);

// Получить лотерею по ID
router.get('/lottery/:id', lotteryController.getOneLottery);

// Обновить лотерею по ID
router.put('/lottery/:id', lotteryController.updateLottery);

// Удалить лотерею по ID
router.delete('/lottery/:id', lotteryController.deleteLottery);

module.exports = router;
