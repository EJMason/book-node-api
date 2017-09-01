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
  host: string;
  port: string;
  database: string;
  user: string;
  connectionString: string;
  tableNames: Array<string>;
  pw: string;
}

const builder = (): Options => {
  const defaults: any = {};

  defaults.node_env = '' + process.env.NODE_ENV;
  defaults.is_prod = process.env.NODE_ENV === 'production';

  if (!process.env.PORT) defaults.port = 8000;
  else defaults.port = '' + process.env.PORT;

  if (defaults.node_env !== 'prod') {
    defaults.pg = {
      host: process.env.HOST,
      port: process.env.PRT,
      database: process.env.LOCALDBNAME,
      user: process.env.LOCALUSER,
      connectionString: process.env.DBURI,
      pw: process.env.PW
    };
  } else {
    defaults.pg = {
      host: process.env.DBHOST,
      port: process.env.PRT,
      database: process.env.DB,
      user: process.env.USR,
      connectionString: process.env.DBURI,
      pw: process.env.PW
    };
  }

  defaults.pg.tableNames = ['users', 'books', 'authors', 'users_books'];

  return defaults;
};

const completed: Options = builder();

export default completed;
