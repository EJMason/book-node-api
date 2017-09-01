# Headspace Code Challenge

Name: EJ Mason

Gitub: link to github

email: eliotjunior@gmail.com

linkedin: put here

Create an api to manage users and books. The api can be consumed in the following ways:

* Create user accounts with unique user names.
* Create a book that has a title and a library.
* Add books to users libraries in the 'unread' state.
* Mark books as read or unread for a specific user.
* Remove books from a users library.
* List all books in a user's library:
  * FILTER by author
  * FILTER by read/unread.

* Assumptions given: Security is not a concern.

## Installation & Setup

* Navigate to the project root:

```
cd headspace-book-node-api
```
* Next install the required packages in the package.json

* Note: A lot of the typescript features use newer versions of Node. It is preferred to have Version > 8.0. It can be downloaded here:

[Node js homepage](https://nodejs.org/en/)

##### Installation with yarn:

```
  yarn start
```
* this will install the packages, build the typscript into ./dist and start the server

##### Installation with npm:

```
npm run install:npm

note: the packages can be installed individually:

npm run install
npm run build
npm run start

or...

/<path to project>/node_modules/.bin/tsc
/<path to project>/node_modules/.bin/node ./dist/server.js

*  other scripts listed in package.json
```

## Tools Used

* Typescript
* Express
* Jest unit tests
* gulp
* supertest mock api testing

## Database and Persistence

* PostgresQL relational database
* Build out my own ORM using Node Postgres library
* see ./sql for all the raw query files

###### Relationship Design

![db-relations](https://i.imgur.com/KFoihbk.png)

I designed the schema in this way so the users_books relation table (many-to-many) would keep track of the collections or librairies of each user. All queries are performed with raw sql. The files are in the repository. The actual sql files are consumed which enables the sql to be changed without bringing down the database.


# API design and process

API conform to REST principles and ensure the enpoints made sense for CRUD operations. Explanations for each endpoint below:


## User: Create new user

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
        "user_name": "ploob"
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
    "message": "¯_(ツ)_/¯"
  },
  "message": "Oops, it looks like there was an error!",
  "data": []
}
```













These endpoints retrieve and set data related to:

* Information about the user
* The users library or collection of books

CRUD Operations related to User:
###
* [CREATE new user](user/get.md) : `POST /api/v1/user`
* [GET users collection of books](user/put.md) : `PUT /api/user/books`

### Account related

Endpoints for viewing and manipulating the Accounts that the Authenticated User
has permissions to access.

* [Show Accessible Accounts](accounts/get.md) : `GET /api/accounts/`
* [Create Account](accounts/post.md) : `POST /api/accounts/`
* [Show An Account](accounts/pk/get.md) : `GET /api/accounts/:pk/`
* [Update An Account](accounts/pk/put.md) : `PUT /api/accounts/:pk/`
* [Delete An Account](accounts/pk/delete.md) : `DELETE /api/accounts/:pk/`





