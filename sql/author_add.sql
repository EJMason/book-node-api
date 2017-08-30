INSERT INTO authors (name)
SELECT $1
WHERE NOT EXISTS (SELECT * FROM authors WHERE name = $1);

SELECT * FROM authors WHERE name = $1;
