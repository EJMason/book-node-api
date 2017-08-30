SELECT users.id, users.user_name, users_books.read, books.title, authors.name
FROM users
INNER JOIN users_books
ON users.id = users_books.users_id
INNER JOIN books
ON users_books.books_id = books.id
  INNER JOIN authors ON
  books.authors_id = authors.id
WHERE users.id = 1;