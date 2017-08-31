UPDATE users_books
SET
  read = 'false'
WHERE users_id = $1 AND books_id = $2;

SELECT * FROM users_books WHERE books_id = $2 AND users_id = $1;