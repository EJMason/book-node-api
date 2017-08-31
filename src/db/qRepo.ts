import { IDatabase, IMain } from 'pg-promise';
import sqlProvider = require('./sqlBuilder');
import { Author, User, Book } from 'global';
import * as winston from 'winston';
const sql = sqlProvider;

export class QRepo {
  constructor(db: any, pgp: IMain) {
    this.db = db;
    this.pgp = pgp;
  }

  private db: IDatabase<any>;
  private pgp: IMain;

  // --------- USER ------------ //
  public findUserByName(user: User) {
    return this.db.oneOrNone(
      'SELECT * FROM users WHERE user_name = $1',
      user.user_name
    );
  }

  public findUserById(user: User) {
    return this.db.oneOrNone('SELECT * FROM users WHERE id = $1', +user.id);
  }

  public createUser(user: User) {
    return this.db.one(sql.queries.addUser, user.user_name);
  }

  // --------- AUTHOR -----------------//
  public createAuthor(author) {
    winston.verbose('Create author Query');
    winston.verbose(`${sql.queries.addAuthor}`);
    return this.db.one(sql.queries.addAuthor, author.name);
  }

  // ------------ BOOK ----------------- //
  public createBook = async book => {
    const a = await this.db.one(sql.queries.addAuthor, book.author);
    return this.db.one(sql.queries.addBook, [book.title, a.id]);
  };

  // ----------- COLECTION ------------ //
  public addToLibrary(data): any {
    return this.db.oneOrNone(sql.queries.addLibBook, [
      `${data.books_id}`,
      `${data.users_id}`
    ]);
  }

  public toggleRead(library: any, isRead: boolean): Promise<any> {
    return this.db.oneOrNone(sql.queries.markRead, [
      isRead,
      library.users_id,
      library.books_id
    ]);
  }

  // public findBookInLibrary(data: any) {
  //     return this.db.oneOrNone(
  //       'SELECT * FROM users_books WHERE users_id=$1 AND books_id=$2',
  //       [data.users_id, data.books_id]
  //     );
  // }

  // public addToLibrary(data): any {
  // return this.db.task('add-book-to-user-library', async t => {
  //     const exists = await this.findBookInLibrary(data);
  //     winston.info('DOES IT EXIST: ' + exists + '<--');
  //     if (!exists)
  //     return await t.one(this.sql.library_add, [
  //         `${data.books_id}`,
  //         `${data.users_id}`
  //     ]);
  //     return undefined;
  // });
}
