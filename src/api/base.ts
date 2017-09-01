import { Router } from 'express';
import * as express from 'express';

export interface RouterInterface {
  endpoints: () => void;
}
abstract class Base {
  router: express.Router;
  db: any;

  constructor() {
    this.router = Router();
  }

  // ------------ MIDDLEWARE ---------------------- //

  protected validBk(req, res, next): void {
    // TODO: get info from DB here.

    const title = req.body.title;
    const author = req.body.author;

    if (!title || !(typeof title === 'string')) {
      next('type');
      res.status(400).send('400 - error, invalid title field');
    }
    if (!author || !(typeof author === 'string')) {
      res.status(400).send('400 - error, invalid author field');
    }
    next();
  }

  // ----------- HELPERS --------------- //
}

// const base = new BaseRouter();
export default Base;