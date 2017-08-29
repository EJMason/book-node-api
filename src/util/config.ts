import * as dotenv from 'dotenv';

dotenv.config();

// ! NEED TO CONFIGURE TYPES FOR ENV VARIABLES!
interface Options {
  node_env: string; // all env options need configuring
  is_prod: boolean;
  port: string | number;

  pg: DbOptions;
}

interface DbOptions {
  dBhost: string;
  dBport: string;
  database: string;
  user: string;
  constr: string;
}

const builder = (): Options => {
  const defaults: any = {};

  defaults.node_env = '' + process.env.NODE_ENV;
  defaults.is_prod = process.env.NODE_ENV === 'production';

  if (!process.env.PORT) defaults.port = 8000;
  else defaults.port = '' + process.env.PORT;

  if (defaults.node_env === 'test') {
    defaults.pg = {
      dBhost: 'localhost',
      dBport: 5432,
      database: process.env.LOCALDBNAME,
      user: process.env.LOCALUSER,
      connectionString: 'postgres://ejm:4808@localhost:5432/ejm'
    };
  } else {
    defaults.pg = {
      dBhost: process.env.DBHOST,
      dBport: process.env.DBPORT,
      database: process.env.DBDATABASE,
      user: process.env.DBUSER,
      constr: process.env.DBURI
    };
  }

  return defaults;
};

const completed: Options = builder();

export default completed;
