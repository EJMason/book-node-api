// import { QueryFile, TQueryFileOptions } from 'pg-promise';
import * as winston from 'winston';
import { QueryFile } from 'pg-promise';
import path from 'path';

import db from './connection';
import config from '../util/config';

/**
 * We can use abstract classes here since
 * models will share a lot of the same properties
 */

// interface AllQueries {
//   manager: Manage;
//   users: QueriesByTable;

// }

// interface Manage {
//   addTableUsers: any;
//   addTableBooks: any;
//   addTableAuthors: any;
//   addTableUsers_Books: any;

//   destroyTableUsers: any;
//   destroyTableBooks: any;
//   destroyTableAuthors: any;
//   destroyTableUsers_Books: any;
// }

// interface QueriesByTable {
//   insert?: any;
//   delete?: any;
// }

abstract class DbModel {
  protected query: Array<string>;
  // ! fix type here
  public db: any;
  public tables: Array<string>;
  public qPath: string;

  constructor() {
    this.db = db;
    this.tables = config.pg.tableNames;
    this.qPath = path.join(__dirname, './../../sql');
  }

  /**
   * Use this to enable using sql query files. More effiecient
   * than javascript, expecially when minified. Should also escape
   * to ensure data is secure
   */
  public buildSQL(file: string): QueryFile {
    const opts: any = {
      // ! Combats malicious queries
      minify: true
    };

    const qf: QueryFile = new QueryFile(file, opts);

    if (qf.error) {
      winston.error(
        `ERROR: This occured because of a query
        syntax error. Fix the file and try again.`
      );
      winston.error(`${qf.error}`);
      winston.info('hello');
    }
    return qf;
  }

  protected createSQL(files: Array<string>): void {
    return files.reduce((iter: any, file: any): any => {
      iter[file] = this.buildSQL(`${this.qPath}/${file}.sql`);
      return iter;
    }, {});
  }
}

export default DbModel;
