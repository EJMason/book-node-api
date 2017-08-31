// import { Request, Response } from 'express';
import BaseRouter from './base';
import { RouterInterface } from './base';

import db = require('../db');

export class BookRouter extends BaseRouter implements RouterInterface {
  constructor() {
    super();
    this.endpoints();
  }

  public endpoints() {
    /** [POST] /api/v1/books
     * Req.body: { title: string, author: string}
     */
    this.router.post('/', (req, res) => {
      console.log('HEEEROOOO: ', req.body);
      db.queries.createBook(req.body).then(item => res.status(200).send(item));
    });
  }

  // ------------ MIDDLEWARE ---------------------- //

  // ----------- HELPERS --------------- //
}

export default new BookRouter();
