// * This file is to ensure there is only 1 connection,
import * as Promise from 'bluebird';
import pgPromise from 'pg-promise';
import config from '../util/config';

/**
 * Subpar type definitions for pg-promise
 * not enough time to implement own interfaces
 * so there may be a few anys in the db code
 */
const initOptions: any = {
  promiseLib: Promise,

  // cosmetic option for output
  capSQL: true,

  disconnect: (client, dc) => {
    const cp = client.connectionParameters;
    console.log('Disconnecting from database:', cp.database);
  },

  query: e => {
    console.log('QUERY:', e.query);
  },

  receive: (data, result, e) => {
    camelizeColumns(data);
  },

  error: (err, e) => {
    if (e.cn) {
      // this is a connection-related error
      // cn = safe connection details passed into the library:
      //      if password is present, it is masked by #
    }
    if (e.query) {
      // query string is available
      if (e.params) {
        // query parameters are available
      }
    }
    if (e.ctx) {
      // occurred inside a task or transaction
    }
  }
};

const pgp: any = pgPromise(initOptions);

function camelizeColumns(data) {
  const tmp = data[0];
  for (let prop in tmp) {
    const camel = pgp.utils.camelize(prop);
    if (!(camel in tmp)) {
      for (let i = 0; i < data.length; i++) {
        const d = data[i];
        d[camel] = d[prop];
        delete d[prop];
      }
    }
  }
}

const db = pgp(config.pg.connectionString);

export default db;
