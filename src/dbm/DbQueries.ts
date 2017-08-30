import DbModel from './DbModel';
// import Bluebird from 'bluebird';
import { pgp } from './connection';

class DbQueries extends DbModel {
  public sql: any;
  temp: string;
  query: any;

  constructor() {
    super();
    this.query = {};
    this.sql = this.createSQL(['user_add']);

    // init class
    this.userQueries();
  }
  // adds user with validation
  public addUser(username: string) {
    return this.db.task('add-user-no-duplicates', async t => {
      // First check if user exists
      // TODO: Handle Errors
      const check = await this.findByUsername(username, t);
      if (!check) return await t.one(this.sql.user_add, username);
      return undefined;
    });
  }

  public findUserById(id, t) {
    console.log('----dfsdfds----');
    const task = t ? t : this.db;
    return task.oneOrNone('SELECT * FROM users WHERE id=$1', id);
  }

  public findByUsername(name, t) {
    const task = t ? t : this.db;
    return task.oneOrNone('SELECT * FROM users WHERE user_name=$1', name);
  }

  private userQueries() {
    this.query.users = {
      add: (username: string, t = this.db) => {
        const task = t ? t : this.db;
        return task.one(this.sql.user_add, username);
      },
      // findById: (id: number, t?: any): any => {
      //   console.log('----dfsdfds----');
      //   const task = t ? t : this.db;
      //   return task.oneOrNone('SELECT * FROM users WHERE id=$1', id);
      // },
      findByUsername: (name: number, t?: any): any => {
        const task = t ? t : this.db;
        return task.oneOrNone('SELECT * FROM users WHERE user_name=$1', name);
      },
      findAll: (t?: any) => {
        const task = t ? t : this.db;
        return task.any('SELECT * FROM users');
      }
    };
  }
}

const queryClass = new DbQueries();
export default queryClass;
