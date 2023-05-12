const signRouter = require('express').Router();
const { celebrate } = require('celebrate');
const { login, createUser } = require('../controllers/users');

const { loginValidation, userValidation } = require('../utils/validation');

signRouter.post('/signin', celebrate(loginValidation), login);
signRouter.post('/signup', celebrate(userValidation), createUser);

module.exports = signRouter;
