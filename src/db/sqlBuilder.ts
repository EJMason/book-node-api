import { QueryFile, TQueryFileOptions } from 'pg-promise';

const path = require('path');

export = {
  queries: {
    addAuthor: fileConsumer('author_add.sql'),
    addUser: fileConsumer('user_add.sql')
    // init: fileConsumer('users/init.sql'),
    // drop: fileConsumer('users/drop.sql'),
    // add: fileConsumer('users/add.sql')
  }
};

function fileConsumer(file: string): QueryFile {
  const fullPath: string = path.join(__dirname, './../../sql');
  // const fullPath: string = file;
  const options: TQueryFileOptions = {
    minify: true,
    params: {
      schema: 'public'
    }
  };

  const qf: QueryFile = new QueryFile(`${fullPath}/${file}`, options);

  if (qf.error) {
    console.error(qf.error);
  }

  return qf;
}
