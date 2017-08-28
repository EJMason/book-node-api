DROP DATABASE IF EXISTS library;
CREATE DATABASE library;

\c library;

CREATE TABLE `Users` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`id_str` VARCHAR(255) NOT NULL,
	`username` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Books` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`title` VARCHAR(255) NOT NULL,
	`author_id` BINARY NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Authors` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Users_Books` (
	`users_id` INT NOT NULL,
	`books_id` INT NOT NULL,
	`is_read` BOOLEAN NOT NULL DEFAULT 'false'
);

ALTER TABLE `Books` ADD CONSTRAINT `Books_fk0` FOREIGN KEY (`author_id`) REFERENCES `Authors`(`id`);

ALTER TABLE `Users_Books` ADD CONSTRAINT `Users_Books_fk0` FOREIGN KEY (`users_id`) REFERENCES `Users`(`id`);

ALTER TABLE `Users_Books` ADD CONSTRAINT `Users_Books_fk1` FOREIGN KEY (`books_id`) REFERENCES `Books`(`id`);
