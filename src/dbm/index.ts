import { QueryFile, TQueryFileOptions } from 'pg-promise';

const path = require('path');
/**
 * We can use abstract classes here since
 * models will share a lot of the same properties
 */

export abstract class DbModel {
  // "postgres://<user>:<pw>@localhost:5432/<db name>"
  // const db

  /**
   * Use this to enable using sql query files. More effiecient
   * than javascript, expecially when minified. Should also escape
   * to ensure data is secure
   */
  protected buildQueryFromSQLFile(file: string): QueryFile {
    const options: TQueryFileOptions = {
      // ! Combats malicious queries
      minify: true
    };

    const queryFromFile: QueryFile = new QueryFile(
      path.join(__dirname, file, options)
    );

    if (queryFromFile.error) {
      console.error(
        'ERROR: This occured because of a query\
        syntax error. Fix the file and try again.'
      );
      console.error(queryFromFile.error);
    }
    console.log('SQL File query creation success');
    return queryFromFile;
  }
}
