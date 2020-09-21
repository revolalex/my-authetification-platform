/************************** Module ****************************/
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

/************************** MidlleWare ****************************/
app.use(express.urlencoded({ extended: false }));
// parse requests of content-type: application/json
app.use(bodyParser.json());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

/************************** connection mysql ****************************/
const connection = require('./src/database/mysql')
connection.connect();

/************************** Routes ****************************/
require("./src/routes/routes")(app, connection);

//connection.end();

app.listen(3000, function() {
  console.log("server listening on: http://localhost:3000/sign-up");
});
