import { Router } from 'express';

export class UserRouting {
  router: my_express.Router;

  constructor() {
    this.router = Router();

    // * [PUT] /api/v1/users
    this.addNewUserAccount();

    // * [GET | PUT | DELETE] /api/v1/users/:user_id/books
    this.userLibraryRoutes();

    // * [PUT | DELETE] /api/v1/users/:user_id/books/read
    this.toggleBookReadStatus();
  }
  public userLibraryRoutes() {
    // ! ________/api/v1/user/:user_id/books____________ //
    this.router
      .route('/:user_id/books')
      .all(this.ctrl_all)
      /** GET - // ! /user/:user_id/books
       * Users will be able to query their library at this endpoint
       */
      .get((req, res) => {
        // TODO: Implement GET here
      })
      /**
       * PUT - // ! /user/:user_id/books
       * remove books from a users library
       */
      // ? req.params: { user_id: <val in url above>}
      // ? req.body: { title, name } | []<bookObjs>
      .put((req, res) => {
        // TODO: validate the req.body and req.params, 400 for error
        // TODO: check if book exists within database
        // TODO: check if book already associated with user, 304 if it does
        // TODO:
      })
      // ! add books from a users library
      // ? req.params: { user_id: <val in url above>}
      // ? req.body: { title, name } | []<bookObjs>
      .delete((req, res) => {
        // TODO: validate the req.body and req.params
        // TODO: Remove the many-to-many relationship from user to book
        // TODO: Delete returns empty data with 204 status
      });
  }

  public toggleBookReadStatus() {
    // ! ________/api/v1/users/:user_id/books/read____________ ! //

    this.router
      .route('/:user_id/books/read')
      .all(this.ctrl_all)
      // * PUT - /user/:user_id/books
      // ! remove books from a users library
      // ? req.params: { user_id: <val in url above>}
      // ? req.body: { bookid } | []<bookObjs>
      .put((req, res) => {
        // ! toggle book --> read
        // TODO: toggle book as read
      })
      // * DELETE - /user/:user_id/books
      // ! remove books from users library
      // ? req.params: { user_id: <val in url above>}
      // ? req.body: { book_id } | []<bookObjs>  // titles are not unique
      .delete((req, res) => {
        // ! toggle book --> unread
        // TODO: toggle book as unread
      });
  }

  public addNewUserAccount() {
    this.router.route('/').all(this.ctrl_all)// * POST - /user
    // ! remove books from a users library
    // ? req.body: { username }
    .post((req, res) => {
      // ! add new user account
      // TODO: model add account
    });
  }

  public ctrl_all: my_express.RequestHandler = (req, res, next) => {
    // ! some middleware, if needed
    next();
  };
}

const userRoutes = new UserRouting();
export default userRoutes.router;
