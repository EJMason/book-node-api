INSERT
  INTO users(userName)
  VALUES ($1)
RETURNING *