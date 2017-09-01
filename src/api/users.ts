import { RespError } from 'global';
import { Router } from 'express';
import * as express from 'express';
import * as winston from 'winston';
import * as chalk from 'chalk';
import db = require('../db');
import { logger } from '../errors';

// import config from '../util/config';

/*
  Usually I separate files into a mess of sub components
  but for this I put more login into single files for easier
  reading. In this instance I would have used 2 - 3 more directories.

  1. Routing logic only, routers
  2. All logic using req and res
  3. reusable utilities and services

  persistent layer code would live in the db directory

 */

export class UserRouting {
  router: express.Router;

  constructor() {
    this.router = Router();

    this.router.get('/books/:users_id', this.getUsersBooks);
    this.router.post('/', this.validateUsr, this.addUser);
    this.router.put('/:users_id/books/:books_id', this.addToLibrary);
    this.router.delete('/:users_id/books/:books_id', this.handleDelete, this.removeFromLibrary);

    this.router.all('/*', this.catchAll);

    this.router.use(this.errorHandlerUsers);
  }

    // -------- Routes ------------//
  /**
   * /api/v1/users/books
   * filter by author    /users/books?author=name
   * filter by read |unread  /books?read=true
   * sorted by read and unread
   * @param null or url query parameters
   */
  private getUsersBooks = async (req, res, next) => {
    let books = await db.queries.getAllUsersBooks(req.params);

    books = this.bookFilter(books, req.query);

    res.status(200)
    .send({
      data: books
    });

  }



    /**
     * Add user to ddatabase
     *  POST - /api/v1/users
     * @param req.body: { user_name }
     * @return data user object
     */
  private addUser = async (req, res, next) => {
    try {
      const user = await db.queries.createUser(req.body);
      logger.debug('Data from SQL: ' + JSON.stringify(user));

      res
      .status(200)
      .send({
        data: [user]
      });
    } catch (err) {
      next({ xError: {
          status: 400,
          code: null,
          message: 'invalid input',
          default: err
        }
      });
    }
  }



  /**
   * POST /api/v1/users/:users_id/books/:books_id
   * req.params.users_id
   * --- Associates a book with a user
   * ! I SHOULD join the data here...
   * @return json book
   */
  private addToLibrary = (req, res, next) => {
    if (req.params.users_id === 'books') {
      next();
    }

    db.queries
    .addToLibrary(req.params)
    .then((d) => {
      if (d) {
        res
        .status(200)
        .send({ data: [d] });
      }
      else {
        next({ xError: {
            status: 304,
            code: null,
            message: 'DNE',
          }
        });
      }

    }).catch(next);
  }



  /**  ! ----- DELETE ------
   *  /api/v1/users/:user_id/books/:books_id
   * req.params.users_id
   * req.body.books_id (allows for batch add + remove)
   *
   * Handle if,
   * user sends incorrect data
   */
  private removeFromLibrary = (req, res, next) => {
    db.queries
      .libraryDelete(req.params)
      .then(item => {
        res
        .status(204)
        .send({ data: [] });
      })
      .catch(next);
  }



  /**
   * Catch function for all routes
   *
   */
  private catchAll = (req, res, next) => {
    next(this.returnError(400, `Route DNE: ${req.route}`));
  }

  private returnError = (status: number, message: string): RespError => {
    return {
        status: status || 400,
        code: null,
        message: message || "¯\_(ツ)_/¯"
      };
  }


  /**
   * Filters books data, error if data invalid
   */
  private bookFilter = (books, query) => {
    return books.filter(book => {
      if (query.hasOwnProperty('read')
        && !(book.read.toString() === query.read)) {
        return false;
      }
      if (query.hasOwnProperty('author')
        && !(book.author.toLowerCase() === query.author.toLowerCase())) {
        return false;
      }
      return true;
    });
  }


    // ---------------- MIDDLEWARE ---------------------------------- //
  /**
   * Validates delete method
   */
  private handleDelete = (req, res, next) => {
    logger.verbose(chalk.blue('\n\n-------- Middleware Handle Delete ----------\n\n'));
    if (!req.params.books_id || !req.params.users_id) {
      next({
        xError: {
          status: 400,
          code: null,
          message: 'invalid input'
        }
      });
    } else {
      next();
    }
  };

  /**
   * Validates user data
   * /users
   */
  private validateUsr = async (req, res, next) => {
    logger.verbose(chalk.blue('\n\n-------- Middleware Validate User ----------\n\n'));

    logger.debug(chalk.red('USERS: validateUsr'));
    const usr = req.body.user_name;

    if (!usr || typeof usr !== 'string') {
      next([400, 'invalid input']);
    } else if (usr.length < 4 || usr.length > 20) {
      next([400, 'invalid input']);
    }

    const user = await db.queries.findUserByName(req.body);

    if (user) {
      next({
        xError: {
          status: 409,
          message: 'Username Already Exists.',
          code: null,
        }
      });
    } else {
      next();
    }
  };


  /**
   * Handles all error requests
   */
  private errorHandlerUsers = (err, req, res, next) => {
    logger.verbose(chalk.blue('\n\n-------- Error: Handle for Users ----------\n\n'));
    winston.verbose(err);
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
}

const userRoutes = new UserRouting();
export default userRoutes.router;
