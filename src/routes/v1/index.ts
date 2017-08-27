import express from 'express';

import app from '../../appInstance';
import books from './books';

const v1 = express.Router();

const routers = {
  books: express.Router(),
  users: express.Router()
};

v1.use('/books', routers.books);
v1.use('/users', routers.users);

module.exports = routers;
