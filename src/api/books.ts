import BaseRouter from './base';
import { RouterInterface } from './base';

export class BookRouter extends BaseRouter implements RouterInterface {
  constructor() {
    super();

    // *  ------- [POST] /api/v1/books -------  //
    // ? Add a new book to DB
    // ? BODY: title, author

    this.endpoints();
  }

  public endpoints() {
    this.router.post('/', this.validateBook, (req, res) => {
      // TODO: put into db here.

      res.status(200).send('User Created');
    });
  }

  // ------------ MIDDLEWARE ---------------------- //
  // middleware declared in base class

  // ----------- HELPERS --------------- //
}

export default new BookRouter();
