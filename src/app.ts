// import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';

import config from './util/config';
import booksRouter from './api/routes.books';
import usersRouter from './api/routes.users';

class App {
  public app: express.Application;

  constructor() {
    // initiate server instance
    this.app = express();
    /**
     * Middleware and routing are initialized in the
     * constrocuter to ensure the order of async execution
     */
    this.middleware();
    this.routing();
  }

  private middleware(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));

    if (!config.is_prod) {
      this.app.use(logger('dev'));
    }
  }

  private routing(): void {
    const base = express.Router();

    base.get('/', (req, res) => {
      res.status(200).send('Hello Boi!');
    });

    // pass router object to another folder
    this.app.use('/', base);

    this.app.use('/api/v1/books', booksRouter);
    this.app.use('/api/v1/users', usersRouter);
    // this.app.use('/users', routers.users);
  }
}

export default new App().app;
