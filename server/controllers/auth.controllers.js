const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');

// Конфигурация Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT, 10),
  secure: false, // Используем TLS (не SSL)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Вспомогательные функции
const generateToken = (payload, expiresIn = '1h') => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

const sendEmail = async (to, subject, htmlContent) => {
  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: htmlContent,
  });
};

class AuthController {
  // Регистрация пользователя
  async register(req, res) {
    try {
      const { email, password, full_name } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email и пароль обязательны' });
      }

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Пользователь с таким email уже существует' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        password_hash: hashedPassword,
        full_name,
      });

      const token = generateToken({ id: user.id, email: user.email });
      const confirmLink = `${process.env.BASE_URL}/api/auth/confirm/${token}`;

      await sendEmail(
        user.email,
        'Подтверждение регистрации',
        `<p>Пожалуйста, подтвердите свою регистрацию, перейдя по <a href="${confirmLink}">этой ссылке</a>.</p>`
      );

      res.status(201).json({ message: 'Пользователь зарегистрирован. Проверьте вашу почту для подтверждения.' });
    } catch (error) {
      console.error('Ошибка регистрации:', error.message);
      res.status(500).json({ error: 'Ошибка сервера. Попробуйте позже.' });
    }
  }

  // Подтверждение email
  async confirmEmail(req, res) {
    try {
      const { token } = req.params;

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.id);

      if (!user) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }

      if (user.is_verified) {
        return res.status(400).json({ message: 'Email уже подтверждён.' });
      }

      user.is_verified = true;
      await user.save();

      res.json({ message: 'Email подтверждён успешно.' });
    } catch (error) {
      console.error('Ошибка подтверждения email:', error.message);
      res.status(400).json({ error: 'Неверный или истекший токен.' });
    }
  }

  // Логин пользователя
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email и пароль обязательны' });
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ error: 'Неверный email или пароль.' });
      }

      if (!user.is_verified) {
        return res.status(403).json({ error: 'Подтвердите ваш email перед входом.' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) {
        return res.status(404).json({ error: 'Неверный email или пароль.' });
      }

      const token = generateToken({ id: user.id, email: user.email }, '7d');

      res.json({ token, message: 'Вход выполнен успешно.' });
    } catch (error) {
      console.error('Ошибка входа:', error.message);
      res.status(500).json({ error: 'Ошибка сервера. Попробуйте позже.' });
    }
  }
}

module.exports = new AuthController();
