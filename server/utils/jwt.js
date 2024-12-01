require('dotenv').config();
const jwt = require('jsonwebtoken');

// Получаем секрет из переменных окружения
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET не определён в файле .env');
}

// Функция для создания токена
const createToken = (payload, expiresIn = '1h') => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

// Функция для проверки токена
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Неверный токен или истёк срок действия');
  }
};

module.exports = { createToken, verifyToken };
