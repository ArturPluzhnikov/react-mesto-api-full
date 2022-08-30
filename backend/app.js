// eslint-disable-next-line no-use-before-define
const express = require('express');
require('dotenv').config();

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors, celebrate, Joi } = require('celebrate');

const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFound = require('./errors/NotFound');
const { errorHandler } = require('./errors/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// const { allowedCors } = require('./utils/allowedCors');

const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .min(2)
      .max(30),
    about: Joi.string()
      .min(2)
      .max(30),
    avatar: Joi.string()
      // eslint-disable-next-line no-useless-escape
      .regex(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=-]{2,256}\.[a-z]{2,6}\b(?:[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/),
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required(),
  }),
}), createUser);

app.use(auth);
app.use('/', routerUsers);
app.use('/', routerCards);

app.use((req, res, next) => {
  next(new NotFound('Маршрут не найден'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Приложение слушает порт ${PORT}`);
});
