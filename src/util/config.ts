import * as dotenv from 'dotenv';

dotenv.config();

// ! NEED TO CONFIGURE TYPES FOR ENV VARIABLES!
interface Options {
  node_env: any; // all env options need configuring
  is_prod: any;
  port: any;

  pg: DbOptions;
}

interface DbOptions {
  dBhost: any;
  dBport: any;
  database: any;
  user: any;
  constr: any;
}

const defaults: Options = {
  node_env: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
  is_prod: process.env.NODE_ENV === 'production',
  port: process.env.PORT ? process.env.PORT : 8000,

  pg: {
    dBhost: process.env.DBHOST,
    dBport: process.env.DBHOST,
    database: process.env.DBHOST,
    user: process.env.DBHOST,
    constr: process.env.DBURI
  }
};

export default defaults;
