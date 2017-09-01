# User: Add Book to User Library

Adds a book to a users library. The book must already exist

**URL** : `/api/v1/user/:users_id/books/books_id`

**Method** : `PUT`

#### Data constraints

Provide id of user and book

```javascript
provide app parameters
:users_id
:books_d
```

**Data example** All fields must be sent.

```json
http://localhost:8000/api/v1/users/7/books/1
```

## Success Response

**Condition** : Content successfully created

**Code** : `201 CREATED`

**Content example**

```json
{
  {
    "data": [
        {
            "books_id": "1",
            "title": "Super Good Book",
            "users_id": "1",
            "read": false
        }
    ]
}
}
```

## Error Responses

**Condition** : If book or user does not exist.

**Code** : `400 BAD REQUEST`

**Content example**

```json
{
    "error": {
        "status": 400,
        "message": "Something bad happened"
    },
    "message": "Oops, it looks like there was an error!",
    "data": []
}
```


