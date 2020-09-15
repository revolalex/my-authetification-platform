//const { try, try } = require("bluebird");
var express = require("express");
var app = express();

app.use(express.urlencoded({ extended: false }));

const connection = require('./src/database/mysql')

connection.connect();

require("./src/routes/routes")(app, connection);

//connection.end();

app.listen(3000, function() {
  console.log("server listening on: http://localhost:3000/sign-up");
});
