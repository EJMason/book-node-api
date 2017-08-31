INSERT INTO users (user_name)
SELECT $1
WHERE NOT EXISTS (SELECT * FROM users WHERE user_name = $1);

SELECT * FROM users WHERE user_name = $1;