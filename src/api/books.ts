import { RespError } from 'global';
import * as express from 'express';
import { Router } from 'express';
import db = require('../db');
import { logger } from './users';
import * as chalk from 'chalk';

export class BookRouter {
  router: express.Router;

  constructor() {
    this.router = Router();

    this.router.post('/', this.validBk, this.addBook);
    this.router.put('/read', this.markBookRead);
    this.router.put('/unread', this.markBookUnread);

    this.router.all('/*', this.catchAll);

    this.router.use(this.errorHandlerBooks);
  }

    /** [POST] /api/v1/books
     * req.body: { title: string, author: string}
     * add books to the database
     */
    private addBook = (req, res, next) => {
      db.queries
        .createBook(req.body)
        .then(item => res.status(200).send({ data: [item] }))
        .catch(next);
    };

  /**
   * PUT /api/v1/books/read - 100%
   * req.body: { books_id, users_id }
   * updated books to status read
   */
  private markBookRead = (req, res, next) => {
    db.queries
      .toggleRead(req.body)
      .then(val => {
        res.status(200).send({ data: [val] });
      })
      .catch(next);
  };

  /**
   * PUT /api/v1/books/unread - 100%
   * req.body: { books_id, users_id }
   * updates books to status unread.
   */
  private markBookUnread = (req, res, next) => {
    console.log('\n\n reg body: ', req.body);
    db.queries
      .toggleUnRead(req.body)
      .then(data => {
        res.status(200).send({data: [data]});
      })
      .catch(next);
  };

  // ------------ MIDDLEWARE ---------------------- //
  protected validBk(req, res, next): void {

    const title = req.body.title;
    const author = req.body.author;

    if (!title || !(typeof title === 'string')) {
      next({
        xError: {
          status: 400,
          code: null,
          message: 'invalid input',
        }
      });
    }
    if (!author || !(typeof author === 'string')) {
      next({
        xError: {
          status: 400,
          code: null,
          message: 'invalid input',
        }
      });
    }
    next();
}

  // -------------- MIDDLEWARES ----------------------- //

  private catchAll = (req, res, next) => {
    logger.verbose('Users: route DNE');
    next(this.returnError(400, `Route DNE: ${req.route}`));
  }

  private errorHandlerBooks = (err, req, res, next) => {
    logger.verbose(chalk.blue('\n\n-------- Error: Handle for Users ----------\n\n'));
    logger.verbose(chalk.magenta('Path: '),  req.path);
    logger.verbose(chalk.magenta('Body: '),   JSON.stringify(req.body));
    logger.verbose(chalk.magenta('Params: '), JSON.stringify(req.params));

    logger.debug(chalk.magenta('Route: '),  req.route);
    // lots of info in the route
    const error = Object.assign({status: 400, message: "¯\_(ツ)_/¯" }, err.xError);
    const status = (!err.xError) ? 400 : err.xError.status;
    res.status(status || 400).send({
      error,
      message: 'Oops, it looks like there was an error!',
      data: []
    });
  };
  // ----------- HELPERS --------------- //

  private returnError = (status: number, message: string): RespError => {
    return {
        status: status || 400,
        code: null,
        message: message || "¯\_(ツ)_/¯"
      };
  }
}

const bookRoutes = new BookRouter();
export default bookRoutes.router;
