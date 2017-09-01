# User: Create new user

Create a new user in the database. Ensures that there can be no duplicates. Must conform to a length and style criteria

**URL** : `/api/v1/users/books`

**Method** : `GET`

**URL Parameters** :

- `authors={name}` where `name` is name of the books(s) author you want to query in user library

- `read={status}` where `status == true/false` filters books by read or unread


## Success Response

**Condition** : Account created if it was unique and conformed to length parameters.

**Code** : `200 OK`

**Content example**

```json
{
    "data": [
        {
            "read": false,
            "books_id": 1,
            "title": "Ring-tailed possum",
            "author": "Jolyn Northeast",
            "authors_id": 2
        },
        ...
    ]
}
```



