import * as express from 'express';
const books = express.Router();

books.get('/', (req, res) => {
  res.status(200).send('Hello, books.');
});

export default books;
