const User = require('../models/User');
// const logger = require('../utils/logger');

class UserController {
  // Создать пользователя
  async createUser(req, res) {
    try {
      const { email, password_hash, full_name, card_token } = req.body || {};

      // Проверка наличия обязательных полей
      if (!email || !password_hash) {
        return res.status(400).json({ error: 'Поле email и password_hash обязательны' });
      }

      const user = await User.create({ email, password_hash, full_name, card_token });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Получить всех пользователей
  async getUsers(req, res) {
    try {
      const allUsers = await User.findAll();
      if (allUsers.length === 0) {
        res.status(404).json({ message: 'Пользователи ещё не зарегистрированы' });
      } else {
        res.json(allUsers);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Получить одного пользователя по ID
  async getOneUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        res.status(404).json({ message: 'Пользователь не найден' });
      } else {
        res.json(user);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Обновить пользователя по ID
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await User.update(req.body, {
        where: { id: id }
      });
      if (updated) {
        const updatedUser = await User.findByPk(id);
        res.json(updatedUser);
      } else {
        res.status(404).json({ message: 'Пользователь не найден' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Удалить пользователя по ID
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const deleted = await User.destroy({
        where: { id: id }
      });
      if (deleted) {
        res.json({ message: 'Пользователь удалён' });
      } else {
        res.status(404).json({ message: 'Пользователь не найден' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
