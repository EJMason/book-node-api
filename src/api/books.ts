// import { Request, Response } from 'express';
import BaseRouter from './base';
import { RouterInterface } from './base';

import db = require('../db');

export class BookRouter extends BaseRouter implements RouterInterface {
  constructor() {
    super();
    // *  ------- [POST] /api/v1/books -------  //
    // ? Add a new book to DB
    // ? BODY: title, author
    this.endpoints();
  }

  public endpoints() {
    /**
     * Req.body: { title: string, author: string}
     */
    this.router.post('/', (req, res) => {
      db.queries.addAuthor(req.body).then(data => {
        res.status(200).send(data);
      });
    });
  }

  // ------------ MIDDLEWARE ---------------------- //
  // middleware declared in base class

  // ----------- HELPERS --------------- //
}

export default new BookRouter();
