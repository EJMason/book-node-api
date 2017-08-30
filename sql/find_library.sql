SELECT *
FROM users
INNER JOIN users_books
ON users.id = users_books.users_id
INNER JOIN books
ON users_books.books_id = books.id
WHERE users.id = 1

SELECT books.id, books.title, authors.name
FROM books
INNER JOIN authors ON
books.authors_id = authors.id


