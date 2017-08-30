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
  public getAuthorInfo(req, res, next): void {
    /*
    Query the db for the author by name, if he already exists
    we need to get the authorid for the next part
    */
  }

  public validateBook(req, res, next): void {
    // TODO: get info from DB here.

    const title = req.body.title;
    const author = req.body.author;

    if (!title || !(typeof title === 'string')) {
      res.status(400).send('400 - error, invalid title field');
    }
    if (!author || !(typeof author === 'string')) {
      res.status(400).send('400 - error, invalid author field');
    }
    next();
  }

  // protected validateBook(req, res, next): void {
  //   // TODO: get info from DB here.

  //   const title = req.body.title;
  //   const author = req.body.author;

  //   if (!title || !(typeof title === 'string')) {
  //     res.status(400).send('404 - error, invalid title');
  //   }
  //   if (!author || !(typeof author === 'string')) {
  //     res.status(400).send('404 - error, invalid author');
  //   }
  //   next();
  // }

  // ----------- HELPERS --------------- //
}

// const base = new BaseRouter();
export default Base;
