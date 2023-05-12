const { Joi } = require('celebrate');
const { urlRegExp } = require('./constants');

const loginValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};

const userValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(urlRegExp),
  }),
};

const cardValidation = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(urlRegExp),
  }),
};

const cardIdValidation = {
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
};

const idValidation = {
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
};

const aboutValidation = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
};

const avatarValidation = {
  body: Joi.object().keys({
    avatar: Joi.string().regex(urlRegExp).required(),
  }),
};

module.exports = {
  loginValidation,
  userValidation,
  cardValidation,
  cardIdValidation,
  idValidation,
  aboutValidation,
  avatarValidation,
};
