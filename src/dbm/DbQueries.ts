import { User, Book, Author } from 'global';
import DbModel from './DbModel';
// import { pgp } from './connection';

// interface User {
//   userName: string;
//   id?: number;
// }

class DbQueries extends DbModel {
  public sql: any;
  temp: string;
  query: any;

  constructor() {
    super();
    this.sql = this.createSQL(['user_add', 'book_add', 'author_add']);
  }
  // adds user with validation
  // TODO: Handle Errors

  // public addUser(username: string) {
  //   return this.db.oneOrNone(this.sql.user_add, username);
  // }

  public addUser(user: User) {
    return this.db.task('add-user-no-duplicates', async t => {
      const userExists = await this.findByUsername(user, t);
      // return if user is valid
      if (!userExists) return await t.one(this.sql.user_add, user.userName);

      // return undefined if the user already exists
      return undefined;
    });
  }

  public addBook(book: Book): any {
    return this.db.task('abb-book', async t => {
      const author = await this.addAuthor(book, t);
      return await t.oneOrNone(this.sql.book_add, [book.title, `${author.id}`]);
    });
  }

  public addAuthor(book: Book, t = this.db) {
    return t.oneOrNone(this.sql.author_add, book.author.name);
  }

  public findAuthorByName(book: Book, t = this.db) {
    return t.oneOrNone('SELECT * FROM authors WHERE name=$1', book.author.name);
  }

  public findAuthorById(author: Author, t = this.db) {
    return t.oneOrNone('SELECT * FROM authors WHERE id=$1', `${author.id}`);
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
