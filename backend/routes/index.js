const router = require('express').Router();
const { celebrate } = require('celebrate');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { auth } = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { loginValidation, userValidation } = require('../utils/validation');

router.post('/signin', celebrate(loginValidation), login);
router.post('/signup', celebrate(userValidation), createUser);
const NotFoundError = require('../errors/NotFoundError');

router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);

router.use('/*', auth, (req, res, next) => {
  const err = new NotFoundError('Страница не найдена');
  next(err);
});

module.exports = router;
