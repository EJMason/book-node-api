import { IDatabase, IMain } from 'pg-promise';
import sqlProvider = require('./sqlBuilder');
import {
  Author,
  User,
  User_RAW,
  // Book
} from 'global';
import * as winston from 'winston';
const sql = sqlProvider;

// interface TestScripts {
//   truncate: () => void;
//   createTables: () => void;
// }

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
    winston.verbose('Create author Query');
    winston.verbose(`${sql.queries.authorInsert}`);
    return this.db.one(sql.queries.authorInsert, author.name);
  }

  // ------------ BOOK ----------------- //
  // { name: 'the boobbo googoo', author: 'billy bobky' }
  public createBook = async book => {
    // winston.info('createBookDB Method', book);
    const a = await this.db.one(sql.queries.authorInsert, book.author);
    if (a) return this.db.one(sql.queries.bookInsert, [book.name, a.id]);
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
      lib.users_id,
      lib.books_id
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

  // ========== Testing Data Stuff =========== //

  // public testing: TestScripts = {
  //   truncate: () => {
  //     winston.info('TRUNCATING TABLES...');
  //     return this.db.none(
  //       `TRUNCATE "users", "books", "authors", "users_books" CASCADE;`
  //     );
  //   },
  //   createTables: () => {
  //     return this.db.none(
  //       `CREATE TABLE "users" (
  //         "id" serial NOT NULL,
  //         "user_name" TEXT NOT NULL UNIQUE,
  //         CONSTRAINT users_pk PRIMARY KEY ("id")
  //       );

  //       CREATE TABLE "books" (
  //         "id" serial NOT NULL,
  //         "title" TEXT NOT NULL,
  //         "authors_id" int8 NOT NULL,
  //         CONSTRAINT books_pk PRIMARY KEY ("id")
  //       );

  //       CREATE TABLE "authors" (
  //         "id" serial NOT NULL,
  //         "name" TEXT NOT NULL UNIQUE,
  //         CONSTRAINT authors_pk PRIMARY KEY ("id")
  //       );

  //       CREATE TABLE "users_books" (
  //         "books_id" int8 NOT NULL,
  //         "users_id" int8 NOT NULL,
  //         "read" BOOLEAN NOT NULL DEFAULT 'false'
  //       );

  //       ALTER TABLE "books" ADD
  //       CONSTRAINT "books_fk0"
  //       FOREIGN KEY ("authors_id")
  //       REFERENCES "authors"("id");

  //       ALTER TABLE "users_books" ADD
  //       CONSTRAINT "users_books_fk0"
  //       FOREIGN KEY ("books_id")
  //       REFERENCES "books"("id");

  //       ALTER TABLE "users_books" ADD
  //       CONSTRAINT "users_books_fk1"
  //       FOREIGN KEY ("users_id")
  //       REFERENCES "users"("id");
  //     `
  //     );
  //   }
  // };

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
