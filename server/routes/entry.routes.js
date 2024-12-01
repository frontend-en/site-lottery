const express = require('express');
const router = express.Router();
const entryController = require('../controllers/entry.controllers');

// Получить все записи об участии
router.get('/entries', entryController.getEntries);

// Создать запись об участии
router.post('/entries', entryController.createEntry);

// Получить запись об участии по ID
router.get('/entries/:id', entryController.getOneEntry);

// Обновить запись об участии
router.put('/entries/:id', entryController.updateEntry);

// Удалить запись об участии
router.delete('/entries/:id', entryController.deleteEntry);

module.exports = router;
