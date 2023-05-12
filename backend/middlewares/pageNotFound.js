const NotFoundError = require('../errors/NotFoundError');

const pageNotFound = (req, res, next) => {
  next(new NotFoundError('Такого адреса не существует'));
};

module.exports = { pageNotFound };
