// import { Request, Response } from 'express';
import BaseRouter from './base';
import { RouterInterface } from './base';
import db from '../dbm/dbQueries';

export class BookRouter extends BaseRouter implements RouterInterface {
  constructor() {
    super();
    // *  ------- [POST] /api/v1/books -------  //
    // ? Add a new book to DB
    // ? BODY: title, author
    this.endpoints();
  }

  public endpoints() {
    // req.body
    // this.validateBook,
    /**
     * Req.body: { title: string, author: string}
     */
    this.router.post('/', (req, res) => {
      db
        .addBook(req.body)
        .then(book => {
          res.status(200).send(book);
        })
        .catch(err => res.status(400).send(err));
    });
  }

  // ------------ MIDDLEWARE ---------------------- //
  // middleware declared in base class

  // ----------- HELPERS --------------- //
}

export default new BookRouter();
