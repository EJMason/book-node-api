// import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as chalk from 'chalk';
import { logger } from './api/users';

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
    this.app.use(this.prequest);
    // this.app.use(helmet());

    this.app.use(errorHandler.clientErrorHandler);

    if (!config.is_prod) {
      this.app.use(morgan('dev'));
    }
  }

  private routing(): void {
    const base = express.Router();

    base.get('/', (req, res) => {
      res.status(200).send('HI me!');
    });

    // pass router object to another folder
    // this.app.use('/', base);

    this.app.use('/api/v1/books', booksRouter);
    this.app.use('/api/v1/users', usersRouter);
  }

  private prequest = (req, res, next) => {
    logger.debug(chalk.magenta('Method: '), req.method);
    logger.debug(chalk.magenta('Body: '),   JSON.stringify(req.body));
    logger.debug(chalk.magenta('Params: '), JSON.stringify(req.params));

    logger.debug(JSON.stringify(req.route));
    // logger.debug(chalk.magenta('Route: '),  req.route);

    logger.verbose('Prequest setting info');

    res.set({
      'Content-Type': 'application/json',
      'x-timestamp': Date.now(),
      'x-sent': true,
    });

    next();
  };
}

export default new App().app;
