# Headspace Code Challenge

Name: EJ Mason
Gitub: link to github
email: eliotjunior@gmail.com
linkedin: put here

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

## Database and Persistence

* PostgresQL relational database
* Build out my own ORM using Node Postgres library
* see ./sql for all the raw query files

###### Relationship Design

![db-relations](https://i.imgur.com/KFoihbk.png)


# API design and process


### User Endpoints

These endpoints retrieve and set data related to:

* Information about the user
* The users library or collection of books

Each endpoint manipulates or displays information related to the User whose
Token is provided with the request:

* [Show info](user/get.md) : `GET /api/user/`
* [Update info](user/put.md) : `PUT /api/user/`

### Account related

Endpoints for viewing and manipulating the Accounts that the Authenticated User
has permissions to access.

* [Show Accessible Accounts](accounts/get.md) : `GET /api/accounts/`
* [Create Account](accounts/post.md) : `POST /api/accounts/`
* [Show An Account](accounts/pk/get.md) : `GET /api/accounts/:pk/`
* [Update An Account](accounts/pk/put.md) : `PUT /api/accounts/:pk/`
* [Delete An Account](accounts/pk/delete.md) : `DELETE /api/accounts/:pk/`





