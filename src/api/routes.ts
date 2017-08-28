import { Router } from 'express';

/**
 * Here I would use separate files again, but for the sake of reading the
 * code I will put it in a single file since there are only several
 * endpoints
 */

interface Routers {
  users: Router;
  books: Router;
}

// router.users.ts
const routers: Routers = {
  users: Router(),
  books: Router()
};

// ! add new users
routers.users.post('/');

// ! get books associated with a user

// ! add/remove books from a users library
routers.users.put('/:userId/books');
routers.users.delete('/:userId/books');

// ! mark books as read/unread
routers.users.put('/:userId/books/read');
routers.users.delete('/:userId/books/read');

// --------------------- router.books.ts --------------- //
// ! add books to db
routers.users.post('/');

export default routers;
