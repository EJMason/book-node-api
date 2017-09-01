# Headspace Code Challenge

Name: EJ Mason

Gitub: [https://github.com/EJMason](https://github.com/EJMason)

email: **eliotjunior@gmail.com**

linkedin: [linkedin.com/in/eliotmason/](linkedin.com/in/eliotmason/)

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
  yarn install
  yarn build
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

##### note: all endponts use prefix /api/v1

* [**CREATE new user**](docs/userCreate.md) : `POST /users`

* [**GET users books**](docs/getBooks.md) : `GET /users/books`
  * filter by author `?author={name}`
  * filter by read   `?read={true/false}`
  * filers may be combined

* [**CREATE new book**](docs/addBook.md) : `POST /books`

* [**Add book to user Library**](docs/addBookUser.md) : `PUT /user/:users_id/books/books_id`

* [**Delete from Library**](docs/deleteBookUser.md) : `DELETE /users/:users_id/books/:books_id`

* [**Set book status true for user**](docs/bookTrue.md) : `PUT /books/read`

* [**Set book status false for user**](docs/bookFalse.md) : `PUT /books/unread`






