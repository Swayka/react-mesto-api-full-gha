const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { auth } = require('../middlewares/auth');
const { celebrate } = require('celebrate');
const { login, createUser } = require('../controllers/users');
const { loginValidation, userValidation } = require('../utils/validation');

router.post('/signin', celebrate(loginValidation), login);
router.post('/signup', celebrate(userValidation), createUser);

router.use('/users',  auth, usersRouter);
router.use('/cards',  auth, cardsRouter);

router.use('/*', auth, (req, res, next) => {
  const err = new NotFoundErr('Страница не найдена');
  next(err);
});

module.exports = router;
