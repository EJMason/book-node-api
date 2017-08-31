import { Router } from 'express';
import * as express from 'express';
import * as winston from 'winston';

import db = require('../db');

export class UserRouting {
  router: express.Router;

  constructor() {
    this.router = Router();

    this.userRouting();
  }

  public userRouting() {
    this.router.post('/', this.validateUserAccount, (req, res) => {
      db.queries
        .createUser(req.body)
        .then(data => {
          res.status(200).send(data);
        })
        .catch(res.send);
    });
  }

  private validateUserAccount = async (req, res, next) => {
    const usr = req.body.user_name;
    if (!usr || !(typeof usr === 'string')) {
      res.status(400).send('error, user_name must exist and be a string');
    } else if (usr.length < 4 || usr.length > 20) {
      res
        .status(400)
        .send('error, user_name length must be greate than 4 and less than 20');
    } else {
      const user = await db.queries.findUserByName(req.body);
      if (user) res.status(400).send('error, username already exists.');
      else {
        next();
      }
    }
  };

  // ! =======================================================
  public userLibraryRoutes() {
    this.router
      .route('/:user_id/books')
      .all(this.ctrl_all)
      // * Users will be able to query their library at this endpoint
      .get((req, res) => {
        // TODO: Implement GET here
        res.status(200).send('1234');
      })
      // * PUT - // ! /user/:user_id/books
      // * remove books from a users library
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

  public ctrl_all: express.RequestHandler = (req, res, next) => {
    // ! some middleware, if needed
    next();
  };
}

const userRoutes = new UserRouting();
export default userRoutes.router;
