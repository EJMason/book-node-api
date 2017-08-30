import DbModel from './DbModel';
// import * as path from 'path';

// users.sql books.sql authors.sql users_books.sql
class DbUtil extends DbModel {
  public tableType: string;
  public sql: any;

  constructor() {
    super();
    this.tableType = 'Util';

    this.sql = this.createUtilSQL(['drop', 'tables', 'truncate']);
  }

  private createUtilSQL(files: Array<string>): void {
    return files.reduce((iter: any, file: any): any => {
      iter[file] = this.buildSQL(`${this.qPath}/manage/${file}.sql`);
      return iter;
    }, {});
  }

  public truncateAll = () => this.db.none(this.sql.truncate);
  public createAll = () => this.db.none(this.sql.tables);
  public dropAll = () => this.db.none(this.sql.drop);
}

const dbUtilities = new DbUtil();

export default dbUtilities;
