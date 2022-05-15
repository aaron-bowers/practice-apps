const mysql = require("mysql2");
const Promise = require("bluebird");

// Configure process.env variables in ../.env
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

db.connectAsync()
  .then(() => console.log(`Connected to MySQL as id: ${db.threadId}`))
  .then(() =>
    // Expand this table definition as needed:
    db.queryAsync(
      `CREATE TABLE IF NOT EXISTS responses (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(30) NOT NULL,
        password VARCHAR(20),
        cookie VARCHAR(60),
        street VARCHAR(60),
        city VARCHAR(30),
        state VARCHAR(15),
        zipcode INT(5),
        credit VARCHAR(24),
        expiration VARCHAR(7),
        cvv INT(4),
        billZip INT(5),
        UNIQUE KEY (email)
      )`
    )
  )
  .catch((err) => console.log(err));

module.exports = db;