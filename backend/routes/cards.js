const cardsRouter = require('express').Router();
const { celebrate } = require('celebrate');
const { cardValidation, cardIdValidation } = require('../utils/validation');

const { createCard } = require('../controllers/cards');
const { getCards } = require('../controllers/cards');
const { deleteCard } = require('../controllers/cards');
const { putLike } = require('../controllers/cards');
const { deleteLike } = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', celebrate(cardValidation), createCard);
cardsRouter.delete('/:cardId', celebrate(cardIdValidation), deleteCard);
cardsRouter.put('/:cardId/likes', celebrate(cardIdValidation), putLike);
cardsRouter.delete('/:cardId/likes', celebrate(cardIdValidation), deleteLike);

module.exports = cardsRouter;
