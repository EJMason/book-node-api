import { Router } from 'express';
import * as express from 'express';
import * as winston from 'winston';
// import * as chalk from 'chalk';

export const logger = new winston.Logger({
  level: 'debug',
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
        const user = db.queries.findBookInLibrary(req.body);
        res.status(200).send({ data: [user] });
      } catch (err) {
        next(err);
      }
    });

    /**
     * GET - /api/v1/users/books
     *
     * filter by author_id    /users/books?author=name
     *   author_id, user_id
     * sort by read           /books?read=true
     *
     * filter by read |unread  /books?read=true
     *
     * filter by read
     * sorted by read and unread
     */

    this.router.get('/books', (req, res, next) => {
      db.queries.getUsers('2').then(a => {
        console.log(a);
        res.status(200).send('yi');
      });
    });
    // this.router.get('/books', (req, res, next) => {
    //   see how to detirmine the order of things
    //   console.log('===========x========');
    //    db.queries.getAll('2')
    //     .then(data => {
    //       console.log('==========xx========');
    //       res.status(200).send('here');
    //    });
    //    .catch(err => console.log(err))
    //   console.log(data);
    //   console.log(JSON.stringify(data));
    //   res.status(200).send(data);

    //   sort by author
    // });


    /**
     * POST /api/v1/users/:user_id/books/:books_id
     * req.params.users_id
     * --- Associates a book with a user
     * ! I SHOULD join the data here...
     */
    this.router.put('/:users_id/books/:books_id', (req, res, next) => {

      db.queries.addToLibrary(req.params)
        .then(d => {
          if (d) res.status(200).json({ data: [d] });
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


    this.router.all('/*', (req, res) => {
      logger.debug('Catch handler called...');

      res
      .status(400)
      .json({
        message: 'Route DNE',
        route: req.route
      });
    });
  }


  // ---------------- MIDDLEWARE ---------------------------------- //
  private handleDelete = (req, res, next) => {
    if (!req.params.books_id || !req.params.users_id) {
      next([400, 'invalid input']);
    } else {
      next();
    }
  };


  // private prequest = (req, res, next) => {
  //   logger.info(chalk.magenta('Method: '), req.method);
  //   // logger.info(`Path: ${req.path}`);
  //   logger.info(chalk.magenta('Route: '),  req.route);
  //   logger.info(chalk.magenta('Path: '),  req.path);
  //   logger.info(chalk.magenta('Body: '),   JSON.stringify(req.body));
  //   logger.info(chalk.magenta('Params: '), JSON.stringify(req.params));

  //   logger.verbose('Prequest setting info');

  //   // res.set({
  //   //   'Content-Type': 'application/json',
  //   //   'x-timestamp': Date.now(),
  //   //   'x-sent': true,
  //   // });

  //   next();
  // };


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
