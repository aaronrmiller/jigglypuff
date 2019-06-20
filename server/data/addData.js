const { Pool } = require("pg");
require("dotenv").config();

//repopulate the database. this is only used when we need to create new dummy data.
// NOT PART OF A ROUTE
// console.log(process.env.PG_PASSWORD);

const pool = new Pool({
  user: process.env.PG_USERNAME,
  host: "raja.db.elephantsql.com",
  database: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  _connectionTimeoutMillis: 2000
});

const DROP_TABLES = `DROP TABLE IF EXISTS Users, Items, Favorites;`;

// "user_id" integer NOT NULL,
const CREATE_USERS = `CREATE TABLE Users (
  "username" varchar(255) NOT NULL,
  "password" varchar(255) NOT NULL,
  "user_id" SERIAL PRIMARY KEY);`;

const INSERT_USERS = `INSERT INTO Users ("username", "password") VALUES 
  ('bob', 'dole'),
  ('jacob', 'richards'),
  ('a', 'b'),
  ('tarlan', 'gardashov'),
  ('will', 'sentance');`;

//   "SKU" serial,
// "inventory" int8 NOT NULL,
const CREATE_ITEMS = `CREATE TABLE Items (
  "user_id" int4 REFERENCES Users("user_id"),
  "item_name" varchar(255) NOT NULL,
  "description" varchar(255) NOT NULL,
  "pic_url" varchar(255) NOT NULL,
  "item_id" SERIAL PRIMARY KEY);`;

const INSERT_ITEMS = `INSERT INTO Items ("user_id", "item_name", "description", "pic_url") VALUES 
  ((SELECT "user_id" FROM Users WHERE "username"='tarlan'), 'dope shirt', 'i love this shirt and you will too', '/static/1.jpg'),
  ((SELECT "user_id" FROM Users WHERE "username"='will'), 'my slicc pants', 'i love this pants and you will too', '/static/8.jpg'),
  ((SELECT "user_id" FROM Users WHERE "username"='will'), 'a very nice bottle', 'its nice', '/static/2.jpg'),
  ((SELECT "user_id" FROM Users WHERE "username"='a'), 'super fly shorts', 'theyre sooooo fly', '/static/3.jpg'),
  ((SELECT "user_id" FROM Users WHERE "username"='tarlan'), 'a hott car', 'my car is hott and you will love it',  '/static/4.jpg'),
  ((SELECT "user_id" FROM Users WHERE "username"='jacob'), 'beautiful pasta', 'its beauty and grace its miss united pasta',  '/static/5.jpg'),
  ((SELECT "user_id" FROM Users WHERE "username"='a'), 'cat', 'thundercat', '/static/6.jpg'),
  ((SELECT "user_id" FROM Users WHERE "username"='a'), 'lightly used pizza', 'diet piuzza',  '/static/7.jpg');`;

const CREATE_FAVORITES = `CREATE TABLE Favorites (
  "user_id" int4 REFERENCES Users("user_id"),
  "item_id" int4 REFERENCES Items("item_id"),
  "favorite_id" SERIAL PRIMARY KEY);`;

const INSERT_FAVORITES = `INSERT INTO Favorites ("user_id", "item_id") VALUES
((SELECT "user_id" FROM Users WHERE "username"='bob'), (SELECT "item_id" FROM Items WHERE "item_name"='cat')),
((SELECT "user_id" FROM Users WHERE "username"='bob'), (SELECT "item_id" FROM Items WHERE "item_name"='dope shirt')),
((SELECT "user_id" FROM Users WHERE "username"='jacob'), (SELECT "item_id" FROM Items WHERE "item_name"='a very nice bottle')),
((SELECT "user_id" FROM Users WHERE "username"='jacob'), (SELECT "item_id" FROM Items WHERE "item_name"='cat'));`;

const dropTables = () => {
  return new Promise((resolve, reject) => {
    pool.query(DROP_TABLES, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const createUsers = () => {
  return new Promise((resolve, reject) => {
    pool.query(CREATE_USERS, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const insertUsers = () => {
  return new Promise((resolve, reject) => {
    pool.query(INSERT_USERS, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const createItems = () => {
  return new Promise((resolve, reject) => {
    pool.query(CREATE_ITEMS, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const insertItems = () => {
  return new Promise((resolve, reject) => {
    pool.query(INSERT_ITEMS, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const createFavorites = () => {
  return new Promise((resolve, reject) => {
    pool.query(CREATE_FAVORITES, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const insertFavorites = () => {
  return new Promise((resolve, reject) => {
    pool.query(INSERT_FAVORITES, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

dropTables()
  .then(createUsers)
  .then(insertUsers)
  .then(createItems)
  .then(insertItems)
  .then(createFavorites)
  .then(insertFavorites)
  .catch(err => {
    console.log(err);
  });
