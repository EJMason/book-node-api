INSERT INTO users_books (books_id, users_id)
SELECT $1, $2
WHERE NOT EXISTS (SELECT * FROM users_books WHERE books_id = $1 AND users_id = $2);

SELECT * FROM users_books WHERE books_id = $1 AND users_id = $2;