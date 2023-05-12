const usersRouter = require('express').Router();
const { celebrate } = require('celebrate');
const { idValidation, aboutValidation, avatarValidation } = require('../utils/validation');

const { getUsers } = require('../controllers/users');
const { getUser } = require('../controllers/users');
const { getUserById } = require('../controllers/users');
const { updateUserInfo } = require('../controllers/users');
const { updateUserAvatar } = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getUser);
usersRouter.get('/:userId', celebrate(idValidation), getUserById);
usersRouter.patch('/me', celebrate(aboutValidation), updateUserInfo);
usersRouter.patch('/me/avatar', celebrate(avatarValidation), updateUserAvatar);

module.exports = usersRouter;
