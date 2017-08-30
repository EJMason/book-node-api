import DbModel from './DbModel';

class DbQueries extends DbModel {
  public sql: any;
  temp: string;

  constructor() {
    super();
    this.temp = '';
    this.sql;
  }

  // add user to the database
  public insertUser(username: string): void {
    return this.db.one();
  }
}

export default DbModel;
