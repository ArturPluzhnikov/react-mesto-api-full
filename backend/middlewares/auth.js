const jwt = require('jsonwebtoken');
require('dotenv').config();
const Unauthorized = require('../errors/Unauthorized');

const { JWT_SECRET = 'some-secret-key' } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Unauthorized('Требуется авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new Unauthorized('Требуется авторизация'));
  }

  req.user = payload;
  next();
};
