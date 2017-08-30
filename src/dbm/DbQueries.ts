import { User, Book, Author, LibFormat } from 'global';
import DbModel from './DbModel';
import * as winston from 'winston';
// import { pgp } from './connection';

class DbQueries extends DbModel {
  public sql: any;
  temp: string;
  query: any;

  constructor() {
    super();
    this.sql = this.createSQL([
      'user_add',
      'book_add',
      'author_add',
      'library_add',
      'library_update'
    ]);
  }

  // TODO: Handle Errors

  public addUser(user: User): Promise<User> {
    winston.verbose('Init: Add User Query');
    return this.db.task('add-user-no-duplicates', async t => {
      const userExists = await this.findByUsername(user, t);
      // return if user is valid
      if (!userExists) return await t.one(this.sql.user_add, user.userName);

      // return undefined if the user already exists
      return undefined;
    });
  }

  public addBook(book: Book): Promise<Book> {
    return this.db.task('add-book', async t => {
      const author = await this.addAuthor(book, t);
      return await t.one(this.sql.book_add, [book.title, `${author.id}`]);
    });
  }

  public toggleRead(library: LibFormat, isRead: boolean): Promise<LibFormat> {
    return this.db.oneOrNone(this.sql.library_update, [
      isRead,
      library.users_id,
      library.books_id
    ]);
  }

  // this looks like it works to me
  // public addToLibrary(data: LibFormat): any {
  //   return this.db.task('add-book-to-user-library', async t => {
  //     const exists = await this.findBookInLibrary(data);
  //     winston.info('DOES IT EXIST: ' + exists + '<--');
  //     if (!exists)
  //       return await t.one(this.sql.library_add, [
  //         `${data.books_id}`,
  //         `${data.users_id}`
  //       ]);
  //     return undefined;
  //   });
  // }
  public addToLibrary(data: LibFormat): any {
    return this.db.oneOrNone(this.sql.library_add, [
      `${data.books_id}`,
      `${data.users_id}`
    ]);
  }

  // ------------------------------------------------------- //
  public addAuthor(book: Book, t = this.db) {
    return t.oneOrNone(this.sql.author_add, book.author.name);
  }

  public findBookInLibrary(data: LibFormat, t = this.db) {
    return t.oneOrNone(
      'SELECT * FROM users_books WHERE users_id=$1 AND books_id=$2',
      [data.users_id, data.books_id]
    );
  }

  public findAuthorByName(book: Book, t = this.db) {
    return t.oneOrNone('SELECT * FROM authors WHERE name=$1', book.author.name);
  }

  public findAuthorById(author: Author, t = this.db) {
    return t.oneOrNone(
      'SELECT * FROM authors WHERE id=$1',
      `${author.author_id}`
    );
  }

  public findUserById(user: User, t) {
    const task = t ? t : this.db;
    return task.oneOrNone('SELECT * FROM users WHERE id=$1', user.id);
  }

  public findByUsername(user: User, t) {
    const task = t ? t : this.db;
    return task.oneOrNone(
      'SELECT * FROM users WHERE user_name=$1',
      user.userName
    );
  }

  public findAllUsers(t) {
    const task = t ? t : this.db;
    return task.any('SELECT * FROM users');
  }
}

const queryClass = new DbQueries();
export default queryClass;
