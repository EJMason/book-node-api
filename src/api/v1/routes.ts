import * as express from 'express';

const books = express.Router();
const users = express.Router();

/*
  TODO: Put something here about saving space so easier to read
*/

const temp = () => {};

books.post('/', temp);
books.put('/read/:user/:book', temp);
books.delete('/read/:user/:book', temp);

users.post('/', temp);
users.put('/:user/books/:book', temp);
users.delete('/:user/books/:book', temp);

users.get('/:user/books');

export const routers = {
  books,
  users
};
