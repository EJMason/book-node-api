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

#### Project structure

Since I developed this application for a coding challenge I put a lot of the code in the same floders that I normally separate. I wanted to make it easier to read so grouped the code a little more. For instance, for each route I use a router, controller, utility and services folder. This time I only created 2 files.

## Database and Persistence

* PostgresQL relational database
* Build out my own ORM using Node Postgres library
* see ./sql for all the raw query files

###### Relationship Design

![db-relations](https://i.imgur.com/KFoihbk.png)

I designed the schema in this way so the users_books relation table (many-to-many) would keep track of the collections or librairies of each user. I also created an authors table to reduce how much space the authors would consume.

 All queries are performed with raw sql. The files are in the repository. The actual sql files are consumed which enables the sql to be changed without bringing down the database.

#### If I had infite time: My system design
There are a lot of things I would have done differently for the overall design of the application.

* **Authentication** would be a must. Using JWT would have made the routes much more simple since users could pass user information in the Bearer header.

* **Caching** the queries would be useful here. It might take a while for data to become stale with a library application.

* **Better Typing** for Typescript. As the project wore on I was forced to use the any keyword to finish, but I would love to interface all the data in the application. **I LOVE  Typscript + Node + Express.**


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

# Testing the API
The database is a could instance so you should be able to connect.Once the server is running, the easiest way to test the API will be using the postman sample file I have created. download it here:

### [Postman Route Tester]()


### Other Notes
* Database connects to an external instance. See .env file for urls.

* Unfortunalty, half of the unit tests are no longer working since a sql library I started with didn't suport typescript. My tests where running with the typescript code and I didn't know until I had written all the tests. Sadly, not enough time to refactor them.

* Feel free to contact me with any questions in regards to the application!



