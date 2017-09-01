# User: Query collection of books

Gets all the books associated with a user

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
            "title": "The cowboys handbook",
            "author": "Jolyn Northeast",
            "authors_id": 2
        },
        ...
    ]
}
```



