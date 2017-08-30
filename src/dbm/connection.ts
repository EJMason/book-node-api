// * This file is to ensure there is only 1 connection,
import * as Promise from 'bluebird';
import pgPromise from 'pg-promise';
import config from '../util/config';
import * as winston from 'winston';

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
    winston.verbose('Disconnecting from database:', cp.database);
  },

  query: e => {
    winston.verbose('------QUERY----\n', e.query);
  },

  receive: (data, result, e) => {
    camelizeColumns(data);
  },

  error: (err, e) => {
    winston.error('ERROR:DATABASE');
    winston.debug(e);
    if (e.cn) {
      winston.error('Connection Error');
      winston.error(e.cn);
    }
    if (e.query) {
      winston.error('Query Error');
      winston.error(e.error);
    }
    if (e.ctx) winston.error('Transaction Error: '.e.ctx);
  }
};

const pgInstance: any = pgPromise(initOptions);

function camelizeColumns(data) {
  const tmp = data[0];
  for (let prop in tmp) {
    const camel = pgInstance.utils.camelize(prop);
    if (!(camel in tmp)) {
      for (let i = 0; i < data.length; i++) {
        const d = data[i];
        d[camel] = d[prop];
        delete d[prop];
      }
    }
  }
}

// TODO: Change this to dynamic
const db = pgInstance('postgres://ejm:4808@localhost:5432/headspace');
export const pgp = pgInstance;
export default db;
