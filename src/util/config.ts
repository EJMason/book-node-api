import * as dotenv from 'dotenv';

dotenv.config();

// ! NEED TO CONFIGURE TYPES FOR ENV VARIABLES!
interface Options {
  node_env: string;
  is_prod: boolean;
  port: string | number;

  pg: DbOptions;
}

interface DbOptions {
  dBhost: string;
  dBport: string;
  database: string;
  user: string;
  connectionString: string;
  tableNames: Array<string>;
}

const builder = (): Options => {
  const defaults: any = {};

  defaults.node_env = '' + process.env.NODE_ENV;
  defaults.is_prod = process.env.NODE_ENV === 'production';

  if (!process.env.PORT) defaults.port = 8000;
  else defaults.port = '' + process.env.PORT;

  if (defaults.node_env !== 'prod') {
    defaults.pg = {
      dBhost: 'localhost',
      dBport: 5432,
      database: process.env.LOCALDBNAME,
      user: process.env.LOCALUSER,
      connectionString: process.env.DBURI
    };
  } else {
    defaults.pg = {
      dBhost: process.env.DBHOST,
      dBport: process.env.DBPORT,
      database: process.env.DBDATABASE,
      user: process.env.DBUSER,
      connectionString: process.env.DBURI
    };
  }

  defaults.pg.tableNames = ['users', 'books', 'authors', 'users_books'];

  return defaults;
};

const completed: Options = builder();

export default completed;
