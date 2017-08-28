import { Router } from 'express';

export class BookRouting {
  router: my_express.Router;

  constructor() {
    this.router = Router();
    // * POST /v1/books
    // * Add a new book to DB
    this.addNewBook();
  }

  public addNewBook() {
    this.router.route('/').all(this.ctrl_all).post((req, res) => {
      // ! add new book
      // TODO: model add book
    });
  }

  // * this is the middleware for the book endpoints
  public ctrl_all: my_express.RequestHandler = (req, res, next) => {
    next();
  };
}
