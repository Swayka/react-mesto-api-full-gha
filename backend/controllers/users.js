const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET, NODE_ENV } = require('../config');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => {
      next(err);
    });
};

const findUserById = (userId, res, next) => {
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден.');
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Некорректный id'));
        return;
      }
      next(err);
    });
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;
  findUserById(userId, res, next);
};

const getUser = (req, res, next) => {
  const userId = req.user._id;
  findUserById(userId, res, next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email,
  } = req.body;

  bcrypt
    .hash(req.body.password, 5)
    .then((hash) => User.create({
      email, password: hash, name, about, avatar,
    }))
    .then((newUser) => {
      res.status(200).send({
        email: newUser.email,
        name: newUser.name,
        about: newUser.about,
        avatar: newUser.avatar,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(
          new ConflictError('Пользователь с таким email уже зарегистрирован'),
        );
      } else if (err instanceof mongoose.Error.ValidationError) {
        next(
          new BadRequestError(
            'Переданы некорректные данные',
          ),
        );
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next, updateData) => {
  const owner = req.user._id;

  User.findByIdAndUpdate(
    owner,
    updateData,
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};

const updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  const updateData = { name, about };

  updateUser(req, res, next, updateData);
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const updateData = { avatar };

  updateUser(req, res, next, updateData);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль.');
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError('Неправильные почта или пароль.');
        }

        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
          {
            expiresIn: '7d',
          },
        );
        res.status(200).send({ token });
      });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
  login,
};
