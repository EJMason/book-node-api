import { QueryFile, TQueryFileOptions } from 'pg-promise';

const path = require('path');

export = {
  queries: {
    authorInsert: fileConsumer('author_add.sql'),
    userInsert: fileConsumer('user_add.sql'),
    bookInsert: fileConsumer('book_add.sql'),
    bookInsertIntoCollection: fileConsumer('library_add.sql'),
    bookToggleBooleanRead: fileConsumer('book_read.sql'),
    bookDeleteFromCollection: fileConsumer('library_remove.sql')
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

  const qf: QueryFile = new QueryFile(`${fullPath}/${file}`, options);

  if (qf.error) {
    console.error(qf.error);
  }

  return qf;
}
