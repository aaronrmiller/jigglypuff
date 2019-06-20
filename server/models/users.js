// TODO: create backend for users

const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.PG_USERNAME,
  host: "raja.db.elephantsql.com",
  database: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  _connectionTimeOutMillis: 2000
});

const usersModel = {
  createUser(username, password) {
    console.log("testing, does it GET HERE THOUGH?", username, password);
    // when users information comes in, add them to the database
    return new Promise((resolve, reject) => {
      pool.query(
        'INSERT INTO Users("username", "password") VALUES($1, $2) RETURNING("username", "user_id")',
        // 'INSERT INTO Users("username", "password") VALUES($1, $2) RETURNING "username", "user_id";',
        [username, password],
        (err, result) => {
          if (err) return reject(err);
          console.log("testing err", err);
          resolve(result);
        }
      );
    });
  },
  checkUser(userName, password) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT username,user_id FROM users WHERE "username"='${userName}' AND "password"='${password}'`,
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  }
};

// console.log('test password:', pool)
// usersModel.createUser('testuser', 'testpassword')
//   .then(res => console.log('testing res', res))
//   .catch(err => console.group('testing err', err));
module.exports = usersModel;

// 'SELECT 1 FROM users WHERE()'
// `SELECT 1 FROM users WHERE username='test';`

// pool.query(
//   `INSERT INTO Users("userName", "password") values($1, $2)`,
// );

// INSERT INTO table_name (column1, column2, column3, ...)
// VALUES (value1, value2, value3, ...);
