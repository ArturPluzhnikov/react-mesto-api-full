const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  getAllUsers, getUser, updateUser, setAvatar, getCurrentUser,
} = require('../controllers/users');
const BadRequest = require('../errors/BadRequest');

router.get('/users', getAllUsers);

router.get('/users/me', getCurrentUser);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string()
      .length(24)
      .hex()
      .required(),
  }),
}), getUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .min(2)
      .max(30),
    about: Joi.string()
      .min(2)
      .max(30),
  }),
}), updateUser);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .custom((value) => {
        if (!validator.isURL(value, { require_protocol: true })) {
          throw new BadRequest('Некорректный URL');
        }
        return value;
      }),
  }),
}), setAvatar);

module.exports = router;
