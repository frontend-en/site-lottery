const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET не определён в файле .env');
}

// Middleware для проверки токена
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Извлекаем токен из заголовка Authorization

  if (!token) {
    return res.status(401).json({ error: 'Токен не предоставлен' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Проверяем токен
    req.user = decoded; // Сохраняем информацию о пользователе в запросе
    next(); // Передаём управление следующему middleware или контроллеру
  } catch (error) {
    res.status(401).json({ error: 'Недействительный или истёкший токен' });
  }
};

module.exports = authMiddleware;
