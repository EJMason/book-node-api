# Mark Users's Book Read

Marks a book in a users collection as read

**URL** : `/api/v1/books/read`

**Method** : `PUT`

#### Data constraints

Provide user name of Account to be created.

```json
{
    "users_id": number,
    "books_id": number,
}
```

**Data example** All fields must be sent.

```json
{
    "users_id": 4,
    "books_id": 2,
}
```

## Success Response

**Condition** : Marked at true if 200 response

**Code** : `200 OK`

**Content example**

```json
{
  "data": [
    {
      "books_id": "1",
      "users_id": "1",
      "read": true
    }
  ]
}
```

## Error Responses

**Condition** : If data out of rande.

**Code** : `304 Not Modified`

**Headers** : `Location: http://testserver/api/accounts/123/`

**Content** :

```json
{
  "data": []
}
```

### Or

**Condition** : If fields are missed

**Code** : `400 BAD REQUEST`

**Content example**

```json
{
    "error": {
        "status": 400,
        "message": "Oops, it looks like there was an error!"
    },
    "message": "Oops, it looks like there was an error!",
    "data": []
}
```


