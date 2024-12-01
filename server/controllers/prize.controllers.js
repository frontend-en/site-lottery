const Prize = require('../models/Prize');
const Lottery = require('../models/Lottery');

class PrizeController {
  // Создать новый приз
  async createPrize(req, res) {
    try {
      const { prize_name, promo_code, is_guaranteed, lottery_id } = req.body;

      // Проверка обязательных полей
      if (!prize_name || !lottery_id) {
        return res.status(400).json({ error: 'Поля prize_name и lottery_id обязательны' });
      }

      // Создание нового приза
      const prize = await Prize.create({ prize_name, promo_code, is_guaranteed, lottery_id });
      res.status(201).json(prize);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Получить все призы
  async getPrizes(req, res) {
    try {
      // Получаем все призы, включая информацию о связанных лотереях
      const prizes = await Prize.findAll({
        include: [
          { model: Lottery, attributes: ['id', 'title'] }, // Связываем призы с их лотереями
        ],
      });

      if (prizes.length === 0) {
        res.status(404).json({ message: 'Призы не найдены' });
      } else {
        res.json(prizes);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Получить один приз по ID
  async getOnePrize(req, res) {
    try {
      const { id } = req.params;

      // Ищем приз по ID, включая связанные данные о лотерее
      const prize = await Prize.findByPk(id, {
        include: [
          { model: Lottery, attributes: ['id', 'title'] }, // Включаем информацию о лотерее
        ],
      });

      if (!prize) {
        res.status(404).json({ message: 'Приз не найден' });
      } else {
        res.json(prize);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Обновить приз по ID
  async updatePrize(req, res) {
    try {
      const { id } = req.params;

      // Обновляем данные приза
      const [updated] = await Prize.update(req.body, { where: { id } });

      if (updated) {
        // Если обновление прошло успешно, возвращаем обновлённый объект
        const updatedPrize = await Prize.findByPk(id, {
          include: [
            { model: Lottery, attributes: ['id', 'title'] }, // Включаем информацию о лотерее
          ],
        });
        res.json(updatedPrize);
      } else {
        res.status(404).json({ message: 'Приз не найден' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Удалить приз по ID
  async deletePrize(req, res) {
    try {
      const { id } = req.params;

      // Удаляем приз по ID
      const deleted = await Prize.destroy({ where: { id } });

      if (deleted) {
        res.json({ message: 'Приз удалён' });
      } else {
        res.status(404).json({ message: 'Приз не найден' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new PrizeController();
