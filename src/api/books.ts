// import { Request, Response } from 'express';
import BaseRouter from './base';
import { RouterInterface } from './base';

const author = { name: 'Billy oob Joe' };
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
    // req.body
    // this.validateBook,
    /**
     * Req.body: { title: string, author: string}
     */
    this.router.post('/', (req, res) => {
      db.queries.addAuthor(author).then(data => {
        console.log('DATA', data);
        res.status(200).send(data);
      });
      // res.status(400).send(error);
    });

    //     .then(book => {
    //       console.log('ARE WE HERE!@!#FDKJSLHGKDHG');
    //       res.status(200).send(book);
    //     })
    //     .catch(err => res.status(400).send(err));
  }

  // ------------ MIDDLEWARE ---------------------- //
  // middleware declared in base class

  // ----------- HELPERS --------------- //
}

export default new BookRouter();
