SELECT users_books.read, books.id AS books_id, books.title, authors.name AS author
FROM users
INNER JOIN users_books
ON users.id = users_books.users_id
INNER JOIN books
ON users_books.books_id = books.id
  INNER JOIN authors ON
  books.authors_id = authors.id
WHERE users.id = $1;