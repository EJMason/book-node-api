# User: Create new Book

Adds a new book to the database and creates a new author if he doesn't exist.

**URL** : `/api/v1/books`

**Method** : `POST`

#### Data constraints

Provide user name of Account to be created.

```json
{
    "title": "text",
    "author": "text"
}
```

**Data example** All fields must be sent.

```json
{
    "title": "J.R.R. Tolkien",
    "author": "Game of Thrones"
}
```

## Success Response

**Condition** : Account created if it was unique and conformed to length parameters.

**Code** : `201 CREATED`

**Content example**

```json
{
    "data": [
        {
            "id": 1,
            "title": "LOTR",
            "authors_id": "1"
        }
    ]
}
```

## Error Responses

**Condition** : Missing field error.

**Code** : `400 Invalid`

**Headers** : `Location: http://testserver/api/accounts/123/`

**Content** :

```json
{
    "error": {
        "status": 400,
        "message": "invalid input",
        "code": null
    },
    "message": "Oops, it looks like there was an error!",
    "data": []
}
```



