const Lottery = require('../models/Lottery');

class LotteryController {
  // Создать новую лотерею
  async createLottery(req, res) {
    try {
      const { title, description, start_date, end_date } = req.body;

      // Проверка обязательных полей
      if (!title || !start_date || !end_date) {
        return res.status(400).json({ error: 'Поля title, start_date и end_date обязательны' });
      }

      const lottery = await Lottery.create({ title, description, start_date, end_date });
      res.status(201).json(lottery);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Получить все лотереи
  async getLotteries(req, res) {
    try {
      const lotteries = await Lottery.findAll();
      if (lotteries.length === 0) {
        res.status(404).json({ message: 'Лотереи не найдены' });
      } else {
        res.json(lotteries);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Получить одну лотерею по ID
  async getOneLottery(req, res) {
    try {
      const { id } = req.params;
      const lottery = await Lottery.findByPk(id);
      if (!lottery) {
        res.status(404).json({ message: 'Лотерея не найдена' });
      } else {
        res.json(lottery);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Обновить лотерею по ID
  async updateLottery(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Lottery.update(req.body, {
        where: { id: id },
      });
      if (updated) {
        const updatedLottery = await Lottery.findByPk(id);
        res.json(updatedLottery);
      } else {
        res.status(404).json({ message: 'Лотерея не найдена' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Удалить лотерею по ID
  async deleteLottery(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Lottery.destroy({
        where: { id: id },
      });
      if (deleted) {
        res.json({ message: 'Лотерея удалена' });
      } else {
        res.status(404).json({ message: 'Лотерея не найдена' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new LotteryController();
