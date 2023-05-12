// eslint-disable-next-line operator-linebreak
const urlRegExp =
  /http(s)?:\/\/(www\.)?[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]+\.[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]+/;

const allowedCors = [
  'https://manzhikova.students.nomoredomains.monster',
  'http://manzhikova.students.nomoredomains.monster',
  'https://api.manzhikova.students.nomoredomains.monster',
  'http://api.manzhikova.students.nomoredomains.monster',
  'localhost:3000',
  'http://localhost:3000',
  'http://localhost:3001',
  'localhost:3001',
];

module.exports = {
  urlRegExp,
  allowedCors,
};
