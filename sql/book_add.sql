INSERT INTO books (title, authors_id)
SELECT $1, $2
WHERE NOT EXISTS (SELECT * FROM books WHERE title = $1 AND authors_id = $2);

SELECT * FROM books WHERE title = $1 AND authors_id = $2;