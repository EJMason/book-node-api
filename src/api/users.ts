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

    // always last
    this.router.use(this.errorHandlerUsers);
  }

  // -------- Routes ------------//

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
     * POST /api/v1/users/:user_id/books/:books_id
     * req.params.users_id
     * req.body.books_id (allows for batch add)
     * --- Associates a book with a user
     * ! I SHOULD join the data here...
     */
    this.router.put('/:users_id/books/:books_id', (req, res, next) => {
      db.queries
        .addToLibrary(req.params)
        .then(d => {
          if (d) res.status(200).send({ data: [d] });
          else next([304, 'Does not exist']);
        })
        .catch(next);
    });

    /**  ! ----- DELETE ------
     *  /api/v1/users/:user_id/books/:books_id
     * req.params.users_id
     * req.body.books_id (allows for batch add + remove)
     *
     * Handle if,
     * user sends incorrect data
     */
    this.router.delete(
      '/:users_id/books/:books_id',
      this.handleDelete,
      (req, res, next) => {
        db.queries
          .libraryDelete(req.params)
          .then(item => res.status(204).send({ status: 204 }))
          .catch(next);
      }
    );
  }

  // ---------------- MIDDLEWARE ---------------------------------- //
  private handleDelete = (req, res, next) => {
    if (!req.params.books_id || !req.params.users_id) {
      next([400, 'invalid input']);
    } else {
      next();
    }
  };

  private mw = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
  };

  private validateUsr = async (req, res, next) => {
    const usr = req.body.user_name;
    if (!usr) next(['400', 'invalid input']);
    else if (typeof usr !== 'string') next([400, 'invalid input']);
    else if (usr.length < 4 || usr.length > 20) next([400, 'invalid input']);

    const user = await db.queries.findUserByName(req.body);
    if (user) res.status(304).send('error, username already exists.');
    else next();
  };

  private errorHandlerUsers = (err, req, res, next) => {
    winston.error('Error in Users Routes...');
    winston.error(err);
    res.status(400).send(err);
  };
}

const userRoutes = new UserRouting();
export default userRoutes.router;
