// import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';

import config from './util/config';
import routers from './api/routes';

class App {
  public app: express.Application;

  constructor() {
    // initiate server instance
    this.app = express();
    // execute middleware
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
    const v1 = express.Router();

    v1.get('/', (req, res) => {
      res.status(200).send('Hello Boi!');
    });

    // pass router object to another folder
    this.app.use('/', v1);

    v1.use('/books', routers.books);
    v1.use('/users', routers.users);
  }
}

export default new App().app;
