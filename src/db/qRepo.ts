import { IDatabase, IMain } from 'pg-promise';
import sqlProvider = require('./sqlBuilder');
import { Author } from 'global';
const sql = sqlProvider;

export class QRepo {
  constructor(db: any, pgp: IMain) {
    this.db = db;
    this.pgp = pgp; // library's root, if ever needed;
  }

  private db: IDatabase<any>;

  private pgp: IMain;

  addAuthor(author: Author) {
    return this.db.one(
      'INSERT INTO authors (name) SELECT $1 WHERE NOT EXISTS (SELECT * FROM authors WHERE name = $1); SELECT * FROM authors WHERE name = $1;',
      author.name
    );
  }
  findById(id: number) {
    return this.db.oneOrNone('SELECT * FROM users WHERE id = $1', +id);
  }
}
