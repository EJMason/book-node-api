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
    /**
     *  POST - /api/v1/users
     * req.body: {user_name }
     */
    this.router.post('/', this.validateUsr, (req, res) => {
      db.queries
        .createUser(req.body)
        .then(data => {
          res.status(200).send([data]);
        })
        .catch(res.send);
    });

    /**
     * POST /api/v1/users/:user_id/books/
     * req.params.users_id
     * req.body.book_id (allows for batch add)
     */
    this.router.post('./:users_id/books', (req, res) => {
      const obj = { books_id: req.body.user_id, users_id: req.params.users_id };
      db.queries.addToLibrary(obj).then(data => {
        if (data.length) res.status(200).send('OK');
        else res.status(400).send('Error, user or book do not exist');
      });
    });

    /**
     * POST /api/v1/users/:user_id/books/
     * req.params.users_id
     * req.body.book_id (allows for batch add/remove)
     */
    this.router.delete('./:users_id/books', (req, res) => {});

    /**
     * POST /api/v1/users/:userid/books/read
     * req.params.users_id
     * req.body: { books_id }
     */
    this.router.post('/:users_id/books/read', (req, res) => {
      const data = {
        users_id: req.params.users_id,
        book_id: req.body.books_id
      };
      db.queries
        .toggleRead(data, true)
        .then(item => res.status(200).send(data));
    });

    /**
     * DELETE /api/v1/users/:userid/books/read
     * req.params.users_id
     * req.body: { books_id }
     */
    this.router.delete('/:users_id/books/read', (req, res) => {
      const data = {
        users_id: req.params.users_id,
        book_id: req.body.books_id
      };
      db.queries.toggleRead(data, false).then(item => res.status(204).send({}));
    });
  }

  // ---------------- MIDDLEWARE ---------------------------------- //

  private validateUsr = async (req, res, next) => {
    const usr = req.body.user_name;
    if (
      !usr ||
      !(typeof usr === 'string') ||
      (usr.length < 4 || usr.length > 20)
    ) {
      res.status(400).send('error, user_name doesnt conform to naming');
    } else {
      const user = await db.queries.findUserByName(req.body);
      if (user) res.status(400).send('error, username already exists.');
      else {
        next();
      }
    }
  };
}

const userRoutes = new UserRouting();
export default userRoutes.router;
