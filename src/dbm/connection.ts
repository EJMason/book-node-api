// * This file is to ensure there is only 1 connection,
import * as Promise from 'bluebird';
import * as pgPromise from 'pg-promise';
// import config from '../util/config';
import * as winston from 'winston';

/**
 * Subpar type definitions for pg-promise
 * not enough time to implement own interfaces
 * so there may be a few anys in the db code
 */
const initOptions: any = {
  promiseLib: Promise

  // disconnect: (client, dc) => {
  //   const cp = client.connectionParameters;
  //   winston.verbose('Disconnecting from database:', cp.database);
  // },

  // query: e => {
  //   winston.verbose('------QUERY----\n', e.query);
  // },

  // error: (err, e) => {
  //   winston.info('ERROR:DATABASE');
  //   winston.info(e);
  //   if (e.cn) {
  //     winston.error('Connection Error');
  //     winston.error(e.cn);
  //   }
  //   if (e.query) {
  //     winston.error('Query Error');
  //     winston.error(e.error);
  //   }
  //   if (e.ctx) winston.error('Transaction Error: ', e.ctx);
  // }
};

const pgInstance: any = pgPromise(initOptions);

// TODO: Change this to dynamic

const conInfo: any = {
  host: 'localhost',
  port: 5432,
  database: 'headspace',
  user: 'ejm'
};
// const db = pgInstance('postgres://ejm:4808@localhost:5432/headspace');
const db = pgInstance(conInfo);
export const pgp = pgInstance;
export default db;
