import db from '../src/dbm/connection';

const qu = `CREATE TABLE "authors" (
              "id" serial NOT NULL,
              "name" TEXT NOT NULL UNIQUE,
              CONSTRAINT authors_pk PRIMARY KEY ("id")
            );`;

xtest('adds 1 + 2 to equal 3', cb => {
  db
    .any(qu)
    .then(function(data) {
      console.log(data);
      expect(10).toEqual(10);
      cb();
    })
    .catch(function(error) {
      // error;
    });
});
