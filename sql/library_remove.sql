DELETE FROM users_books
WHERE (books_id = $1 AND users_id = $2);