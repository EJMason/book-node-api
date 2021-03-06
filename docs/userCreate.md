# User: Create new user

Create a new user in the database. Ensures that there can be no duplicates. Must conform to a length and style criteria

**URL** : `/api/v1/users`

**Method** : `POST`

#### Data constraints

Provide user name of Account to be created.

```json
{
    "user_name": "text"
}
```

**Data example** All fields must be sent.

```json
{
    "user_name": "antz_in_pantz24"
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
        "id": 9,
        "user_name": "coolGuy24"
    }
  ]
}
```

## Error Responses

**Condition** : If Account already exists for User.

**Code** : `303 SEE OTHER`

**Headers** : `Location: http://testserver/api/accounts/123/`

**Content** :

```json
{
    "error": {
        "status": 409,
        "message": "Username Already Exists.",
        "code": null
    },
    "message": "Oops, it looks like there was an error!",
    "data": []
}
```

### Or

**Condition** : If fields are missed, or too long.

**Code** : `400 BAD REQUEST`

**Content example**

```json
{
  "error": {
    "status": 400,
    "message": "Something went wrong"
  },
  "message": "Oops, it looks like there was an error!",
  "data": []
}
```


