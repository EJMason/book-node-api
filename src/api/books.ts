import * as express from 'express';
import { Router } from 'express';
import db = require('../db');
import { logger } from './users';

export class BookRouter {
  router: express.Router;

  constructor() {
    this.router = Router();
    this.endpoints();
  }

  public endpoints() {
    /** [POST] /api/v1/books
     * req.body: { title: string, author: string}
     * add books to the database
     */
    this.router.post('/', this.validBk, (req, res, next) => {
      db.queries
        .createBook(req.body)
        .then(item => res.status(200).send({ data: [item] }))
        .catch(next);
    });

    /**
     * PUT /api/v1/books/read - 100%
     * req.body: { books_id, users_id }
     * updated books to status read
     */
    this.router.put('/read', (req, res, next) => {
      db.queries
        .toggleRead(req.body)
        .then(val => {
          console.log('THIS IS IT: ', val);
          res.status(200).send({ status: 'ok', data: [val] });
        })
        .catch(next);
    });

    /**
     * PUT /api/v1/books/unread - 100%
     * req.body: { books_id, users_id }
     * updates books to status unread.
     */
    this.router.put('/unread', (req, res, next) => {
      db.queries
        .toggleUnRead(req.body)
        .then(item => res.status(200).send({ status: 'ok', data: [item] }));
    });
  }

  // ------------ MIDDLEWARE ---------------------- //
  protected validBk(req, res, next): void {

    const title = req.body.title;
    const author = req.body.author;

    if (!title || !(typeof title === 'string')) {
      next('type');
      res.status(400).send('400 - error, invalid title field');
    }
    if (!author || !(typeof author === 'string')) {
      res.status(400).send('400 - error, invalid author field');
    }
    next();
  }

  // private errorHandlerUsers = (err, req, res, next) => {
  //   logger.error('Error in Users Routes...');
  //   logger.error(err);
  //   res.status(400).send(err);

  // };
  // ----------- HELPERS --------------- //
}

const bookRoutes = new BookRouter();
export default bookRoutes.router;
