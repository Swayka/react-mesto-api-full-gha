const express = require('express');
const mongoose = require('mongoose');

const { errors } = require('celebrate');

const router = require('./routes');
const { pageNotFound } = require('./middlewares/pageNotFound');
const cors = require('./middlewares/cors');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(cors);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use(pageNotFound);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
