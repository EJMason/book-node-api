// * This file is to ensure there is only 1 connection
import * as Promise from 'bluebird';
import * as pgPromise from 'pg-promise';
import config from '../util/config';

/**
 * Terrible type definitions for pg-promise
 * not enough time to implement own interfaces
 * so there may be a few anys in the db code
 */
const initOptions: any = {
  promiseLib: Promise
};

const pgp: any = pgPromise(initOptions);
export default pgp(config.pg);
