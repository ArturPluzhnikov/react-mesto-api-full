const Card = require('../models/card');
const BadRequest = require('../errors/BadRequest');
const Forbidden = require('../errors/Forbidden');
const NotFound = require('../errors/NotFound');

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send({ cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  console.log(req.user._id);

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданные данные некорректны'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFound('По данному запросу данные не найдены');
      } else if (card.owner.toString() !== req.user._id) {
        throw new Forbidden('Отказано в доступе');
      }
      return card.delete();
    })
    .then((card) => res.status(200).send({ card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданные данные некорректны'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFound('По данному запросу данные не найдены');
      }
      res.status(200).send({ likes: card.likes });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданные данные некорректны'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCardDelete = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFound('По данному запросу данные не найдены');
      }
      res.status(200).send({ likes: card.likes });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданные данные некорректны'));
      } else {
        next(err);
      }
    });
};
