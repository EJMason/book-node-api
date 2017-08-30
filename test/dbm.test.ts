// import { User, Book, Author, LibFormat } from '../types/global';
import db_util from '../src/dbm/DbUtils';
import db from '../src/dbm/DbQueries';
import { pgp } from '../src/dbm/connection';
import winston from 'winston';

const SAMPLE_BOOK_1 = {
  title: 'Stupid Dumb Book',
  author: { name: 'John Chickles' }
};
const SAMPLE_BOOK_2 = { title: 'Some book', author: { name: 'bill' } };

const SAMPLE_USER_1 = { userName: 'BOBJONES' };

describe('Adding Users to the database', () => {
  xit('Should insert valid user', async () => {
    await db_util.truncateAll();

    expect.assertions(3);
    const user = await db.addUser(SAMPLE_USER_1);

    expect(user).toBeDefined();
    expect(user).toHaveProperty('userName', 'BOBJONES');
    expect(user).toHaveProperty('id');
  });

  xit('Should resolve null when user exists on insert', async () => {
    return await expect(db.addUser(SAMPLE_USER_1)).resolves.toBeNull();
  });
});

describe('Adding Books to the database', () => {
  xit('should always resolve the author when added', async () => {
    await db_util.truncateAll();

    expect.assertions(3);
    const author = await db.addAuthor(SAMPLE_BOOK_2);
    expect(author).toHaveProperty('name', 'bill');
    expect(author).toHaveProperty('id');

    const again = await db.addAuthor(SAMPLE_BOOK_2);
    expect(again).toHaveProperty('name');
  });

  xit(
    'should add a book to the database and resolve book with author',
    async () => {
      // await db_util.dropAll();
      // await db_util.createAll();
      await db_util.truncateAll();

      const data = await db.addBook(SAMPLE_BOOK_1);

      expect(data).toHaveProperty('title', 'Stupid Dumb Book');
    }
  );

  xit('should resolve undefined when invalid input', () => {});
});

describe('Add book to user library', () => {
  it('should add book to user library', async () => {
    await db_util.truncateAll();
    const bk = await db.addBook(SAMPLE_BOOK_1);
    const user = await db.addUser(SAMPLE_USER_1);
    const item = { users_id: user.id, books_id: bk.id };

    expect.assertions(2);
    const lib = await db.addToLibrary(item);
    expect(lib).toHaveProperty('users_id');

    const doneRead = await db.toggleRead(lib, true);
    expect(doneRead).toHaveProperty('read', true);
  });

  it('Library object remain the same boolean if attempt update', async () => {
    await db_util.truncateAll();
    const bk = await db.addBook(SAMPLE_BOOK_1);
    const user = await db.addUser(SAMPLE_USER_1);
    const item = { users_id: user.id, books_id: bk.id };

    const lib1 = await db.addToLibrary(item);
    const lib2 = await db.addToLibrary(item);
    expect(lib2).toHaveProperty('read', false);

    const doneRead = await db.toggleRead(lib2, true);
    expect(doneRead).toHaveProperty('read', true);
    return;
  });
});
