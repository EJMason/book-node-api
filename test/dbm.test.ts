import db_util from '../src/dbm/DbUtils';
import db from '../src/dbm/DbQueries';
import { pgp } from '../src/dbm/connection';
import winston from 'winston';

const SAMPLE_BOOK_1 = {
  title: 'Stupid Dumb Book',
  author: { name: 'John Chickles' }
};
const SAMPLE_BOOK_2 = { title: 'Some book', author: { name: 'bill' } };
const SAMPLE_USER_1: User = { username: 'BOBJONES' };

describe('Adding Users to the database', () => {
  xit('Should insert valid user', async () => {
    await db_util.truncateAll();
    // await db_util.dropAll();
    // await db_util.createAll();

    expect.assertions(3);
    try {
      const user = await db.addUser('newGuy');

      expect(user).toBeDefined();
      expect(user).toHaveProperty('userName', 'newGuy');
      expect(user).toHaveProperty('id');
    } catch (error) {
      winston.error(error);
      return;
    }
  });

  xit('Should not insert when username is duplicate', async () => {
    return await expect(db.addUser('newGuy')).resolves.toBeNull();
  });
});

describe('Adding Books to the database', () => {
  xit('should add author to the database', async () => {
    await db_util.truncateAll();
    // await db_util.dropAll();
    // await db_util.createAll();

    try {
      const author = await db.addAuthor(SAMPLE_BOOK_2);
      expect(author).toHaveProperty('name', 'bill');
      expect(author).toHaveProperty('id');

      const again = await db.addAuthor(SAMPLE_BOOK_2);
      expect(again).toHaveProperty('name');
    } catch (error) {
      winston.error(error);
      return;
    }
  });

  it('should add a book to the database', async () => {
    // await db_util.dropAll();
    // await db_util.createAll();
    await db_util.truncateAll();

    const data = await db.addBook(SAMPLE_BOOK_1);

    expect(data).toHaveProperty('title', 'Stupid Dumb Book');
  });
});
