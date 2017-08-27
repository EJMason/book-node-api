import * as express from 'express';
import * as app from '../../appInstance';
import books from './books';

const v1 = express.Router();

v1.use('/books', books);

export default v1;
