import { userInfo } from 'os';
import { Router } from 'express';
import * as express from 'express';
import * as winston from 'winston';

export const logger = new winston.Logger({
  level: 'verbose',
  transports: [
    new winston.transports.Console({
      colorize: 'all'
    })
  ]
});

winston.handleExceptions(
  new winston.transports.Console({ colorize: true, json: true })
);

// --------------------------------------------------------------------
import db = require('../db');

export class UserRouting {
  router: express.Router;

  constructor() {
    this.router = Router();
    this.userRouting();

    this.router.use(this.mw);
  }

  public userRouting() {
    /**
     *  POST - /api/v1/users
     * req.body: { user_name }
     */
    this.router.post('/', this.validateUsr, async (req, res, next) => {
      try {
        const user = db.queries.createUser(req.body);
        res.status(200).send({ data: [user] });
      } catch (err) {
        next(err);
      }
    });

    /**
     * POST /api/v1/users/:user_id/books/
     * req.params.users_id
     * req.body.books_id (allows for batch add)
     * --- Associates a book with a user
     */
    this.router.put('/:users_id/books', (req, res, next) => {
      winston.info('REQ PARAMS:, ', req.params);
      db.queries
        .addToLibrary({
          books_id: req.body.books_id,
          users_id: req.params.users_id
        })
        .then(data => {
          winston.info('WHAT IS HERE: :, ', JSON.stringify(data));
          if (data) res.status(200).send('OK');
          else res.status(304).send('Error, resource not modified');
        })
        .catch(next);
    });

    /**
     * POST /api/v1/users/:user_id/books/
     * req.params.users_id
     * req.body.books_id (allows for batch add/remove)
     */
    this.router.delete('./:users_id/books', (req, res, next) => {
      db.queries
        .addToLibrary({
          books_id: req.body.books_id,
          users_id: req.params.users_id
        })
        .then(item => res.status(204).send({}))
        .catch(next);
    });

    /**
     * POST /api/v1/users/:userid/books/read
     * req.params.users_id
     * req.body: { books_id }
     */
    this.router.put('/:users_id/books/read', (req, res, next) => {
      const data = {
        users_id: req.params.users_id,
        books_id: req.body.books_id
      };
      db.queries
        .toggleRead(data, true)
        .then(item => res.status(200).send(data))
        .catch(next);
    });

    /**
     * DELETE /api/v1/users/:userid/books/read
     * req.params.users_id
     * req.body: { books_id }
     */
    this.router.delete('/:users_id/books/read', (req, res, next) => {
      const data = {
        users_id: req.params.users_id,
        books_id: req.body.books_id
      };
      db.queries
        .toggleRead(data, false)
        .then(item => res.status(204).send({}))
        .catch(next);
    });
  }

  // ---------------- MIDDLEWARE ---------------------------------- //

  private mw = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
  };

  private validateUsr = async (req, res, next) => {
    const usr = req.body.user_name;
    if (!usr) next('400 | invalid input');
    else if (typeof usr !== 'string') next('400 | invalid input');
    else if (usr.length < 4 || usr.length > 20) next('400 | invalid input');

    const user = await db.queries.findUserByName(req.body);
    if (user) res.status(304).send('error, username already exists.');
    else next();
  };
}

const userRoutes = new UserRouting();
export default userRoutes.router;
