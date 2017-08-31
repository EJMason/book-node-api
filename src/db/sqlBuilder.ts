import { QueryFile, TQueryFileOptions } from 'pg-promise';

const path = require('path');

export = {
  queries: {
    addAuthor: fileConsumer('author_add.sql'),
    addUser: fileConsumer('user_add.sql'),
    addBook: fileConsumer('book_add.sql'),
    addLibBook: fileConsumer('library_add.sql'),
    markRead: fileConsumer('book_read.sql')
  }
};

function fileConsumer(file: string): QueryFile {
  const fullPath: string = path.join(__dirname, './../../sql');
  const options: TQueryFileOptions = {
    minify: true,
    params: {
      schema: 'public'
    }
  };
  console.log(`${fullPath}/${file}`);
  const qf: QueryFile = new QueryFile(`${fullPath}/${file}`, options);

  if (qf.error) {
    console.error(qf.error);
  }

  return qf;
}
