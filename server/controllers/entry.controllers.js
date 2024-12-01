//  Модель Entry используется для записи участия пользователя в лотерее с возможностью указать выигранный приз.

const Entry = require('../models/Entry');
const User = require('../models/User');
const Lottery = require('../models/Lottery');
const Prize = require('../models/Prize');

class EntryController {
  // Создать запись об участии
  async createEntry(req, res) {
    try {
      const { user_id, lottery_id, prize_id } = req.body;

      // Проверка обязательных полей
      if (!user_id || !lottery_id) {
        return res.status(400).json({ error: 'Поля user_id и lottery_id обязательны' });
      }

      const entry = await Entry.create({ user_id, lottery_id, prize_id });
      res.status(201).json(entry);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Получить все записи
  async getEntries(req, res) {
    try {
      const entries = await Entry.findAll({
        include: [
          { model: User, attributes: ['id', 'email', 'full_name'] },
          { model: Lottery, attributes: ['id', 'title'] },
          { model: Prize, attributes: ['id', 'prize_name'] },
        ],
      });

      if (entries.length === 0) {
        res.status(404).json({ message: 'Записи об участии не найдены' });
      } else {
        res.json(entries);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Получить запись по ID
  async getOneEntry(req, res) {
    try {
      const { id } = req.params;

      const entry = await Entry.findByPk(id, {
        include: [
          { model: User, attributes: ['id', 'email', 'full_name'] },
          { model: Lottery, attributes: ['id', 'title'] },
          { model: Prize, attributes: ['id', 'prize_name'] },
        ],
      });

      if (!entry) {
        res.status(404).json({ message: 'Запись об участии не найдена' });
      } else {
        res.json(entry);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Обновить запись об участии
  async updateEntry(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Entry.update(req.body, { where: { id } });

      if (updated) {
        const updatedEntry = await Entry.findByPk(id, {
          include: [
            { model: User, attributes: ['id', 'email', 'full_name'] },
            { model: Lottery, attributes: ['id', 'title'] },
            { model: Prize, attributes: ['id', 'prize_name'] },
          ],
        });
        res.json(updatedEntry);
      } else {
        res.status(404).json({ message: 'Запись об участии не найдена' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Удалить запись об участии
  async deleteEntry(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Entry.destroy({ where: { id } });

      if (deleted) {
        res.json({ message: 'Запись об участии удалена' });
      } else {
        res.status(404).json({ message: 'Запись об участии не найдена' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new EntryController();
