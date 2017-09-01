import { IDatabase, IMain } from 'pg-promise';
import sqlProvider = require('./sqlBuilder');

import {
  Author,
  User,
  User_RAW,
} from 'global';

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
    return this.db
    .oneOrNone(
      'SELECT * FROM users WHERE user_name = $1',
      user.user_name
    );
  }

  public getUsers(id: any) {
    return this.db.query(
      'SELECT * FROM users'
    );
  }

  public findUserById(user: User_RAW) {
    return this.db.oneOrNone(
      'SELECT * FROM users WHERE id = $1',
       +user.id
      );
  }

  public createUser(user: User) {
    return this.db.one(sql.queries.userInsert, user.user_name);
  }

  // --------- AUTHOR -----------------//
  public createAuthor(author: Author) {
    return this.db.one(sql.queries.authorInsert, author.name);
  }

  // ------------ BOOK ----------------- //
  public createBook = async book => {
    const a = await this.db.one(sql.queries.authorInsert, book.author);
    if (a) return this.db.one(sql.queries.bookInsert, [book.title, a.id]);
    return undefined;
  };

  // ----------- COLECTION ------------ //
  public getAllUsersBooks(data: User): Promise<any> {
    return this.db.manyOrNone(sql.queries.allBooks, data.users_id);
  }

  public addToLibrary(data): Promise<any> {
    return this.db.oneOrNone(sql.queries.bookInsertIntoCollection, [
      `${data.books_id}`,
      `${data.users_id}`
    ]);
  }

  public toggleRead(lib: any): Promise<any> {
    return this.db.oneOrNone(sql.queries.bookToggleBooleanRead, [
      `${lib.users_id}`,
      `${lib.books_id}`
    ]);
  }

  public toggleUnRead(lib: any): Promise<any> {
    return this.db.oneOrNone(sql.queries.bookToggleBooleanUnRead, [
      `${lib.users_id}`,
      `${lib.books_id}`
    ]);
  }

  public libraryDelete = async (obj: any) => {
    const exists = await this.findBookInLibrary(obj);
    if (exists) {
      return await this.db.none(sql.queries.bookDeleteFromCollection, [
        obj.books_id,
        obj.users_id
      ]);
    } else return undefined;
  };

  public findBookInLibrary(data: any) {
    return this.db.query(
      'SELECT * FROM users_books WHERE users_id=$1 AND books_id=$2',
      [data.users_id, data.books_id]
    );
  }

}
