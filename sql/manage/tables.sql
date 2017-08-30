CREATE TABLE "users" (
	"id" serial NOT NULL,
	"user_name" TEXT NOT NULL UNIQUE,
	CONSTRAINT users_pk PRIMARY KEY ("id")
);

CREATE TABLE "books" (
	"id" serial NOT NULL,
	"title" TEXT NOT NULL,
	"authors_id" int8 NOT NULL,
	CONSTRAINT books_pk PRIMARY KEY ("id")
);

CREATE TABLE "authors" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL UNIQUE,
	CONSTRAINT authors_pk PRIMARY KEY ("id")
);

CREATE TABLE "users_books" (
	"books_id" int8 NOT NULL,
	"users_id" int8 NOT NULL,
	"read" BOOLEAN NOT NULL DEFAULT 'false'
);

ALTER TABLE "books" ADD
CONSTRAINT "books_fk0"
FOREIGN KEY ("authors_id")
REFERENCES "authors"("id");

ALTER TABLE "users_books" ADD
CONSTRAINT "users_books_fk0"
FOREIGN KEY ("books_id")
REFERENCES "books"("id");

ALTER TABLE "users_books" ADD
CONSTRAINT "users_books_fk1"
FOREIGN KEY ("users_id")
REFERENCES "users"("id");

