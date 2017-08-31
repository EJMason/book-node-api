// import { Request, Response } from 'express';
import BaseRouter from './base';
import { RouterInterface } from './base';
import db = require('../db');
import { logger } from './users';

export class BookRouter extends BaseRouter implements RouterInterface {
  constructor() {
    super();
    this.endpoints();
  }

  public endpoints() {
    /** [POST] /api/v1/books
     * Req.body: { title: string, author: string}
     */
    this.router.post('/', this.validBk, (req, res, next) => {
      db.queries
        .createBook(req.body)
        .then(item => res.status(200).send({ data: [item] }))
        .catch(next);
    });
  }

  // ------------ MIDDLEWARE ---------------------- //

  // ----------- HELPERS --------------- //
}

export default new BookRouter();
