UPDATE users_books
SET
  read = $1
WHERE users_id = $2 AND books_id = $3;

SELECT * FROM users_books WHERE books_id = $3 AND users_id = $2;