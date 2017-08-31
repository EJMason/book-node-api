// import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
// import * as helmet from 'helmet';

import config from './util/config';
import booksRouter from './api/books';
import usersRouter from './api/users';
import errorHandler from './errors';

class App {
  public app: express.Application;

  constructor() {
    // initiate server instance
    this.app = express();
    /**
     * Middleware and routing are initialized in the
     * constructor to ensure the order of async execution
     */
    this.middleware();
    this.routing();
  }

  private middleware(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    // this.app.use(helmet());

    this.app.use(errorHandler.clientErrorHandler);

    if (!config.is_prod) {
      this.app.use(logger('dev'));
    }
  }

  private routing(): void {
    const base = express.Router();

    base.get('/', (req, res) => {
      res.status(200).send('HI me!');
    });

    // pass router object to another folder
    // this.app.use('/', base);

    this.app.use('/api/v1/books', booksRouter.router);
    this.app.use('/api/v1/users', usersRouter);
  }
}

export default new App().app;
