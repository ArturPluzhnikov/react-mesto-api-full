const router = require('express').Router();
// eslint-disable-next-line import/no-unresolved
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const {
  getAllCards, createCard, deleteCard, likeCard, likeCardDelete,
} = require('../controllers/cards');
const BadRequest = require('../errors/BadRequest');

router.get('/cards', getAllCards);

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .min(2)
      .max(30)
      .required(),
    link: Joi.string()
      .required()
      .custom((value) => {
        if (!validator.isURL(value, { require_protocol: true })) {
          throw new BadRequest('Некорректный URL');
        }
        return value;
      }),
  }),
}), createCard);

router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string()
      .length(24)
      .hex()
      .required(),
  }),
}), deleteCard);

router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string()
      .length(24)
      .hex()
      .required(),
  }),
}), likeCard);

router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string()
      .length(24)
      .hex()
      .required(),
  }),
}), likeCardDelete);

module.exports = router;
