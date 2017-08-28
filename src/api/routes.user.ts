import { Router } from 'express';

export class UserRouting {
  router: my_express.Router;

  constructor() {
    this.router = Router();

    // * [PUT] /v1/users
    // * Create a new user
    this.addNewUserAccount();

    // * [GET | PUT | DELETE] /v1/users/:user_id/books
    // * PUT/DELETE - Add and remove books to the user
    this.userLibraryRoutes();

    // * [PUT | DELETE] /v1/users/:user_id/books/read
    // * Toggle books in a users library as read/unread
    this.toggleBookReadStatus();
  }
  public userLibraryRoutes() {
    this.router
      .route(' /:user_id/books')
      .all(this.ctrl_all)
      .get((req, res) => {
        // ! get books associated with a user
        // TODO: add book from library
      })
      .put((req, res) => {
        // ! add books from a users library
        // TODO: add book from library
      })
      .delete((req, res) => {
        // ! remove books from a users library
        // TODO: remove book from library
      });
  }

  public toggleBookReadStatus() {
    this.router
      .route('/:user_id/books/read')
      .all(this.ctrl_all)
      .put((req, res) => {
        // ! toggle book in library as read
        // TODO: toggle book as read
      })
      .delete((req, res) => {
        // ! toggle book in library as unread
        // TODO: toggle book as unread
      });
  }

  public addNewUserAccount() {
    this.router.route('/').all(this.ctrl_all).post((req, res) => {
      // ! add new user account
      // TODO: model add account
    });
  }

  public ctrl_all: my_express.RequestHandler = (req, res, next) => {
    next();
  };
}
