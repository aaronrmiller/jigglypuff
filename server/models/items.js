const { Pool } = require("pg");
require("dotenv").config();
// defines database queries that are actually called in product-controller
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

// const GET_ALL = `SELECT "Product"."SKU", "Product"."product_name", "size", "inventory", "price", "Category"."category_name" from
// "Product" join "Category" on "Product"."category_id"="Category"."category_id";`;
const GET_ALL_ITEMS = "SELECT * FROM Items;";

// const GET_CATEGORY = `SELECT "Product"."SKU", "Product"."product_name", "size", "inventory", "price", "Category"."category_name" from
// "Product" join "Category" on "Product"."category_id"="Category"."category_id" WHERE "Category"."category_name"=`;

// const UPDATE_INVENTORY = `UPDATE "Product" SET "inventory" = "inventory" - `;

// const UPDATE_SKU = ` WHERE "SKU"=`;

const itemModel = {
  getAll() {
    // retrieve all items for display on main page
    return new Promise((resolve, reject) => {
      pool.query(GET_ALL_ITEMS, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },
  add(user_id, item_name, description) {
    // when a user submits an item, it gets saved to the products db
    // TODO: ALSO NEED TO SAVE THE IMAGE URL THAT IS RETURNED FROM AMAZON OR FIREBASE
    // for now:
    const pic_url = "../public/1.jpg";
    return new Promise((resolve, reject) => {
      pool.query(
        'INSERT INTO Items("user_id", "item_name", "description", "pic_url") values($1, $2, $3, $4)',
        [user_id, item_name, description, pic_url],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  },
  ///SEARCH_BY FUTURE
  searchBy(searchBy) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM Items WHERE "item_name" LIKE '%${searchBy}%' OR "description" LIKE '%${searchBy}%'`,
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  }
};

// itemModel.getAll().then(value => {
//   console.log(value.rows);
// });

// itemModel
//   .add(1, 'batman toy', 'its a batman toy', '/public/2.jpg')
//   .then(result => {
//     console.log(result);
//   });

// itemModel.favorite(1, 2).then(result => {
//   console.log(result);
// });
module.exports = itemModel;
