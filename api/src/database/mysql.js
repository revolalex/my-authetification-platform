var mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "alexandre",
  database: "authentification",
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected to DB");
  // create table users
  let createTableColUsers =
    "CREATE TABLE IF NOT EXISTS users ( id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, name VARCHAR(30) NOT NULL, email VARCHAR(200) NOT NULL, pass VARCHAR(200))";
  connection.query(createTableColUsers, function(err, results) {
    if (err) throw err;
  });
  // create table contacts
  let createTableColContacts =
    "CREATE TABLE IF NOT EXISTS contacts ( id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, name VARCHAR(30) NOT NULL, email VARCHAR(200) NOT NULL, id_user_affiliate VARCHAR(50))";
  connection.query(createTableColContacts, function(err, results) {
    if (err) throw err;
  });
});

module.exports = connection;
