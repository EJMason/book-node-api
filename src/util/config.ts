// require('dotenv').config();
type Options = {
  node_env: string | undefined;
  is_prod: boolean | undefined;
  port: number | string | undefined;
};

const opts: Options = {
  node_env: process.env.NODE_ENV,
  is_prod: process.env.NODE_ENV === 'production',
  port: process.env.PORT ? process.env.PORT : 8000

  // winston logging
  // database stuff
};

export default opts;
