/// <reference path='../../src/types/global.d.ts' />

import * as promise from 'bluebird';
import { IMain, IDatabase, IOptions } from 'pg-promise';
import { QRepo } from './qRepo';
import { logger } from '../api/users';

import config from '../util/config';

interface IExtensions {
  queries: QRepo;
}

const initOptions: IOptions<IExtensions> = {
  promiseLib: promise,

  extend: (obj: IExtensions, dc: any) => {
    obj.queries = new QRepo(obj, pgp);
  }
};

// ------------- MONITOR ---------- //
const monitor = require('pg-monitor');

monitor.attach(initOptions);

monitor.setTheme('matrix');

monitor.setLog((msg, info) => {
  // save the screen messages into your own log file;
  logger.info('HERE IS A MESSAGE!@');
  // logger.info(msg);
  logger.info(info);
});

// Database connection parameters:
// const config = {
//     host: 'localhost',
//     port: 5432,
//     database: 'headspace',
//     user: 'ejm'
// };
import * as pgPromise from 'pg-promise';

const pgp: IMain = pgPromise(initOptions);

const db = <IDatabase<IExtensions> & IExtensions>pgp(
  'postgres://ejm:4808@localhost:5432/headspace'
);

export = db;
