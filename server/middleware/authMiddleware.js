const { verifyToken } = require('../utils/jwt');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Извлекаем токен из заголовка

  if (!token) {
    return res.status(401).json({ error: 'Токен не предоставлен' });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Сохраняем информацию о пользователе в запросе
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = authMiddleware;
