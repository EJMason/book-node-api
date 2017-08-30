import db_util from '../src/dbm/DbUtils';

// beforeEach((done) => {
//   return db_util
//     .destroyAll();
// });

xdescribe('Add users to database', () => {
  it('should work', () => {
    db_util.truncateAll().then(() => {
      expect(1).toBeGreaterThan(0);
    });
  });

  it('sql: should add user to the database', () => {});
});
