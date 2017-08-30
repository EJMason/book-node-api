import db_util from '../src/dbm/DbUtils';
import db from '../src/dbm/DbQueries';
import { pgp } from '../src/dbm/connection';

describe('Adding Users to the database', () => {
  it('Should insert valid user', async () => {
    await db_util.truncateAll();

    expect.assertions(3);
    const user = await db.addUser('newGuy');
    expect(user).toBeDefined();
    expect(user).toHaveProperty('userName', 'newGuy');
    expect(user).toHaveProperty('id');
  });

  it('Should not insert when username is duplicate', async () => {
    return await expect(db.addUser('newGuy')).resolves.toBeUndefined();
  });
});
