import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();

    // execute middleware
    this.middleware();
  }

  private middleware(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes_v1(): void {
    const v1 = express.Router();
    this.app.use('/v1', v1);

    v1.get('/', (req, res) => {
      res.status(200).send('Hello Boi!');
    });

    // pass router object to another folder
  }
}

export default new App().app;
