const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');

// Конфигурация Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT, 10), // Парсим порт из строки
  secure: false, // Используем TLS (не SSL)
  auth: {
    user: process.env.EMAIL_USER, // Ваш email
    pass: process.env.EMAIL_PASS, // Пароль приложения или основной пароль (если включён доступ)
  },
});

class AuthController {
  // Регистрация пользователя
  async register(req, res) {
    try {
      const { email, password, full_name } = req.body;

      // Проверка обязательных полей
      if (!email || !password) {
        return res.status(400).json({ error: 'Email и пароль обязательны' });
      }

      // Проверяем, существует ли пользователь
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Пользователь с таким email уже существует' });
      }

      // Хешируем пароль
      const hashedPassword = await bcrypt.hash(password, 10);

      // Создаем пользователя
      const user = await User.create({
        email,
        password_hash: hashedPassword,
        full_name,
      });

      // Генерируем токен для подтверждения email
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Отправляем email для подтверждения
      const confirmLink = `${process.env.BASE_URL}/api/auth/confirm/${token}`;
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Подтверждение регистрации',
        html: `<p>Пожалуйста, подтвердите свою регистрацию, перейдя по <a href="${confirmLink}">этой ссылке</a>.</p>`,
      });

      res.status(201).json({ message: 'Пользователь зарегистрирован. Проверьте вашу почту для подтверждения.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Подтверждение email
  async confirmEmail(req, res) {
    try {
      const { token } = req.params;

      // Проверяем токен
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Обновляем статус пользователя
      const user = await User.findByPk(decoded.id);
      if (!user) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }

      user.is_verified = true;
      await user.save();

      res.json({ message: 'Email подтвержден успешно' });
    } catch (error) {
      res.status(400).json({ error: 'Неверный или истекший токен' });
    }
  }

  // Логин пользователя
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Проверяем обязательные поля
      if (!email || !password) {
        return res.status(400).json({ error: 'Email и пароль обязательны' });
      }

      // Проверяем, существует ли пользователь
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ error: 'Неверный email или пароль' });
      }

      // Проверяем статус подтверждения
      if (!user.is_verified) {
        return res.status(403).json({ error: 'Подтвердите ваш email перед входом' });
      }

      // Проверяем пароль
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) {
        return res.status(404).json({ error: 'Неверный email или пароль' });
      }

      // Генерируем токен
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

      res.json({ token, message: 'Вход выполнен успешно' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new AuthController();
