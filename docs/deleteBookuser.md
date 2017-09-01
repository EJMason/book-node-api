# User: Add Book to User Library

Removes book from a users library

**URL** : `/api/v1/user/:users_id/books/books_id`

**Method** : `DELETE`

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

**Condition** : Account created if it was unique and conformed to length parameters.

**Code** : `204 No Content`

**Content example**

```json
{}
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


