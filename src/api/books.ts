import { RespError } from 'global';
import * as express from 'express';
import { Router } from 'express';
import db = require('../db');
import { logger } from '../errors';
// import * as chalk from 'chalk';

/*
  Usually I separate files into a mess of sub components
  but for this I put more login into single files for easier
  reading. In this instance I would have used 2 - 3 more directories.

  1. Routing logic only, routers
  2. All logic using req and res
  3. reusable utilities and services

  persistent layer code would live in the db directory

 */

export class BookRouter {
  router: express.Router;

  constructor() {
    this.router = Router();

    // user routes listed here, controllers are below
    this.router.post('/', this.validBk, this.addBook);
    this.router.put('/read', this.markBookRead);
    this.router.put('/unread', this.markBookUnread);

    this.router.all('/*', this.catchAll);
    this.router.use(this.errorHandlerBooks);
  }


  /** [POST] /api/v1/books
   * add books to the database
   * @param req.body { title: string, author: string}
   * @return json { title, id, author_id }
   */
  private addBook = (req, res, next) => {
    db.queries
      .createBook(req.body)
      .then(item => res.status(200).send({ data: [item] }))
      .catch(next);
  };


  /**
   * updated books to status read
   * PUT /api/v1/books/read - 100%
   * @param req.body: { books_id, users_id }
   * @return json: data element changed
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
   * updates books to status unread.
   * PUT /api/v1/books/unread - 100%
   * @param req.body: { books_id, users_id }
   * @return json modified element
   */
  private markBookUnread = (req, res, next) => {
    db.queries
      .toggleUnRead(req.body)
      .then(data => {
        res.status(200).send({data: [data]});
      })
      .catch(next);
  };



  // ------------ MIDDLEWARE ---------------------- //
  /**
   * Validates data for certain book routes
   * @return null
   */
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
  /**
   * Simple catch all for erroneus requests
   */
  private catchAll = (req, res, next) => {
    logger.verbose('Users: route DNE');
    next(this.returnError(400, `Route DNE: ${req.route}`));
  }

  /**
   * Handles all errors in this users route,
   * should be inherited from parent
   */
  private errorHandlerBooks = (err, req, res, next) => {
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
