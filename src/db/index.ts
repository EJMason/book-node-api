/// <reference path='../../src/types/global.d.ts' />

// Bluebird is the best promise library available today, and is the one recommended here:
import * as promise from 'bluebird';
import { IMain, IDatabase, IOptions } from 'pg-promise';
import { QRepo } from './qRepo';

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

// Database connection parameters:
// const config = {
//     host: 'localhost',
//     port: 5432,
//     database: 'headspace',
//     user: 'ejm'
// };
// postgres://ejm:4808@localhost:5432/headspace
// Loading and initializing pg-promise:
import * as pgPromise from 'pg-promise';

const pgp: IMain = pgPromise(initOptions);
// Create the database instance with extensions:
const db = <IDatabase<IExtensions> & IExtensions>pgp(
  'postgres://ejm:4808@localhost:5432/headspace'
);

// Load and initialize optional diagnostics:
// import diagnostics = require('./monitor');

// diagnostics.init(initOptions);

// If you ever need access to the library's root (pgp object), you can do it via db.$config.pgp
// See: http://vitaly-t.github.io/pg-promise/Database.html#.$config
export = db;
